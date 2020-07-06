// server.js
const next = require('next')
const express = require('express')
const session = require('express-session')
const app = express()

//Import express utilities
const bodyParser = require('body-parser')
const multer = require('multer')()
const fs = require('fs')

//Mailing service
const nodemailer = require('nodemailer')

//Image manipulation utilities
const Jimp = require('jimp')

//Utilities
const moment = require('moment')

//Configure next application
const dev = process.env.NODE_ENV !== 'production'
const nextApp = next({ dev })
const handle = nextApp.getRequestHandler()

//Configure firebase utilities
const firebaseAdmin = require('firebase-admin');

const firebaseConfig = {
  credential: firebaseAdmin.credential.cert(JSON.parse(Buffer.from(process.env.FIREBASE_SECRET, "base64").toString("ascii"))),
  apiKey: "AIzaSyDLvYpXoZTgAkkgiRb4KtNxmdr-c34fXx0",
  authDomain: "portfolio-4b1af.firebaseapp.com",
  databaseURL: "https://portfolio-4b1af.firebaseio.com",
  projectId: "portfolio-4b1af",
  storageBucket: "portfolio-4b1af.appspot.com",
  messagingSenderId: "1001483288799",
  appId: "1:1001483288799:web:78f381abcf769a1299a96a",
  measurementId: "G-4SD67CT2JB"
}

firebaseAdmin.initializeApp(firebaseConfig);

const firebaseStorage = firebaseAdmin.storage();
const db = firebaseAdmin.firestore();

//--------------------------------------------
//Nodemailer configuration
const sendmail = async (contact, content) => {
  const testAccount = await nodemailer.createTestAccount();

  const transporter = nodemailer.createTransport({
    service: "gmail",
    port: 587,
    secure: false,
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_PASS,
    }
  });

  const info = await transporter.sendMail({
    from: contact,
    to: process.env.TARGET_EMAIL,
    subject: contact,
    text: content
  });

  return info;
}

//--------------------------------------------
//EXPRESS CONFIGURATION

app.set('PORT', process.env.PORT || 3000);
app.use(session({
  name: 'portfolio',
  secret: 'darksecret',
  resave: false,
  saveUninitialized: false,
  cookie: { 
    httpOnly: true,
    maxAge: 1000*60*60*24*365, 
  }
}));
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())


//--------------------------------------------
//Custom middleware functions
app.use((req, res, next) => {
  if (!req.headers.cookie || !req.session.userid) {
    req.session.userid = req.session.id;
  }
  return next();
})

//--------------------------------------------
//Utility functions
//Upload to GCloud
const errHandle = (err, res) => {
   res.json({status: false, msg: err});
}

const validate = (obj) => {
  for (val in obj) {
    if (!obj[val]) return false;
  }
  return true;
}

//error handler
const uploadGCloud = async (src, destination) => {
  return await firebaseStorage.bucket().upload(src, {
    destination: destination,
    metadata: {cacheControl: 'public, max-age=31536000'}
  });
}

const deleteTemp = (path) => {
  fs.unlink(path, err => {
    if (err) throw err;
  });
}

const uploadPicture = async (file, id, target) => {
  return await Jimp.read(file.buffer).then(async (img) => {
    await img.resize(516, Jimp.AUTO).quality(80).write(`uploads/temp/${id}.jpg`);
    await img.resize(256, 256).quality(50).write(`uploads/temp/thumbs/${id}.jpg`);
  }).then(async () => {
    //Use firebase to save image to cloud
    await Promise.all([
      uploadGCloud(`uploads/temp/${id}.jpg`, `${target}/${id}.jpg`),
      uploadGCloud(`uploads/temp/thumbs/${id}.jpg`, `${target}/thumbs/${id}.jpg`)
    ]).then(res => {
      //Delete local image after saving to cloud
      deleteTemp(`uploads/temp/${id}.jpg`);
      deleteTemp(`uploads/temp/thumbs/${id}.jpg`);
    });
  });
}

//-------------------------------------------------
//Express+NextJS App
nextApp.prepare().then(() => {
  app.get('/.well-known/acme-challenge/XP26WXL0fT-pqlnnzjLXTB2wg3u5I22hiMvS1JoY8Xw', (req, res) => {
    res.send('XP26WXL0fT-pqlnnzjLXTB2wg3u5I22hiMvS1JoY8Xw.cCSs_wJSFybKNIHbXRAHDh7gbURhdtrPqSPMawia2AY');
  });
  
  app.get('/api/admin/authenticateuser', (req, res) => {
    res.json({status: req.session.isLogged || !!req.session.user, msg: ""});
  });

  app.post('/api/sendmessage', (req, res) => {
    if (!validate(req.body)) {
      errHandle("Empty fields.", res);
      return false;
    }
    const {contact, content} = req.body;
    sendmail(contact, content).then(info => {
      if (info.accepted.length) {
        res.json({status: true, msg: "Message sent."});
      } else {
        errHandle("Message not sent. Try again.", res);
      }
    }).catch((err) => errHandle("Service currently unavailable.", res));
  });

  app.post('/api/admin/login', (req, res) => {
    if (req.body.password===process.env.ADMIN_SECRET) {
      req.session.user = process.env.ADMIN_USER;
      req.session.isLogged = true;
      res.json({status: true, msg: "Login successful."});
    } else {
      res.json({status: false, msg: "Invalid password."});
    }
  });

  app.all('/api/admin/*', (req, res, next) => {
    if (!req.session.user) {
      res.json({status: false, msg: "Unauthenticated request."});
      return false;
    } else {
      next();
    }
  });

  app.post('/api/admin/addwork', multer.single("picture"), async (req, res) => {
    //Validate request
    if (!req.file || !validate(req.body)) { 
      errHandle("Please fill all the fields.", res);
      return false;
    }
    //Get details from req.body
    const {title, materials, price, status, dimension, medium} = req.body;
    //Set work ID
    const id = `work${Date.now()}`;
    //Upload work image to cloud storage
    //Use Jimp to manipulate image and save to local dir
    await uploadPicture(req.file, id, 'works').then(async () => {
      //Save details to database
      const docRef = db.collection('works').doc(id);
      await docRef.set({  
        title,
        materials: JSON.parse(materials),
        price,
        status,
        dimension,
        medium
      });
    }).then(() => res.json({status: true, msg: 'Work saved succesfully.'})).catch(err => errHandle("Something went wrong with your request.", res));
  });

  app.post('/api/admin/addblog', multer.array("pictures"), async (req, res) => {
    const {title, author, content, textcontent} = req.body;
    if (!validate(req.body)) {
      errHandle("Please fill the necessary fields.", res);
      return false;
    }
    const id = `post${Date.now()}`;
    let err = "";
    if (req.files.length) {
      for (let i = 0; i < req.files.length; i++) { 
        await uploadPicture(req.files[i], `${id}[${i}]`, `blogs/${id}`).catch(error => {
          if (error) err = "Something went wrong with uploading pictures.";
        });
        if (err) break;
      };
    }
    if (err) {
      errHandle(err, res);
      return false;
    } else {
      const docRef = db.collection('blogs').doc(id);
      await docRef.set({
        title,
        author,
        content,
        excerpt: textcontent.slice(0, 200),
        datePosted: Date.now(),
        comments: 0,
        likes: 0,
      }).then(() => res.json({status: true, msg: "Blog succesfully posted."})).catch(err => errHandle(err, res));
    }
  });

  app.get('/api/getworks', async (req, res) => {
    const worksRef = db.collection('works').orderBy(firebaseAdmin.firestore.FieldPath.documentId());
    const snapshot = await worksRef.get();
    let results = [];
    snapshot.forEach((work) => {;
      results.push({...work.data(), id: work.id});
    });
    res.json({status: true, msg: "", results: results});
  });

  app.get('/api/getblogs', async(req, res) => {
    const blogsRef = db.collection('blogs').orderBy("datePosted", "desc");
    const {lastdate} = req.query;
    let results = [];
    if (lastdate) {
      const snapshot = await blogsRef.startAfter(parseInt(lastdate)).limit(12).get();
      snapshot.forEach((blog) => results.push({...blog.data(), id: blog.id, commentArray: []}));
      res.json({status: true, msg: "", results});
    } else {
      const snapshot = await blogsRef.limit(12).get();
      snapshot.forEach((blog) => results.push({...blog.data(), id: blog.id, commentArray: []}));
      res.json({status: true, msg: "", results});
    }
  });

  app.get('/api/viewblog', async(req, res) => {
    const {id} = req.query;
    const blogRef = db.collection('blogs').doc(id);
    const documentRef = await blogRef.get();
    const likeRef = await blogRef.collection('likes').doc(req.session.userid).get();
    const liked = likeRef.data();
    const document = documentRef.data();
    res.json({status: true, msg: "", document: {...document, liked: !!liked, id: documentRef.id, commentArray: []}});
  });

  app.post('/api/fetchcomments', async(req, res) => {
    const {id, lastDate} = req.body;
    const commentRef = db.collection(`blogs/${id}/comments`).orderBy('datePosted', 'desc');
    let results = [];
    if (lastDate) {
      const comments = await commentRef.startAfter(lastDate).limit(10).get();
      comments.forEach(item => results.push(item.data()));
      res.json({status: true, msg: '', results});
    } else {
      const comments = await commentRef.limit(10).get();
      comments.forEach(item => results.push(item.data()));
      res.json({status: true, msg: '', results});
    }
  });

  app.post('/api/addcomment', async(req, res) => {
    const {content, author, id} = req.body;
    if (!validate(req.body)) {
      errHandle('Please fill the required fields.', res);
      return false;
    }
    const blogRef = db.doc(`blogs/${id}`);
    const commentRef = blogRef.collection('comments');
    await commentRef.add({
      author,
      content,
      datePosted: Date.now(),
    }).then(async () => {
      await blogRef.update({
        comments: firebaseAdmin.firestore.FieldValue.increment(1)
      }).then(() => res.json({status: true, msg: ''}));
    }).catch(err => errHandle(err, res));
  });

  app.post('/api/likeblog', async(req, res) => {
    const {id, like, purpose} = req.body;
    const blogRef = db.collection('blogs').doc(`${id}`);
    const likeRef = blogRef.collection('likes').doc(req.session.userid);
    const isLiked = await likeRef.get();
    if (purpose==='verify') {
      if (isLiked.data()) res.json({status: true, msg: ''});
      else errHandle('', res);
    } else {
      if (isLiked.data()) {
        if (like) {
          errHandle('Already liked.', res);
          return false;
        } else {
          likeRef.delete().then(async () => {
            return await blogRef.update({likes: firebaseAdmin.firestore.FieldValue.increment(-1)});
          }).then(() => res.json({status: true, msg: ''})).catch(err => errHandle(err, res));
        }
      } else {
        if (like) {
          likeRef.set({status: true}).then(async () => {
            return await blogRef.update({likes: firebaseAdmin.firestore.FieldValue.increment(1)});
          }).then(() => res.json({status: true, msg: ''})).catch(err => errHandle(err, res));
        } else {
          errHandle('Something went wrong.', res);
          return false;
        }
      }
    }
  });

  app.all('*', (req, res) => {
    return handle(req, res);
  });

  app.listen(app.get('PORT'), err => {
    if (err) throw err
    console.log('> Ready on http://localhost:'+app.get('PORT'))
  });
})
