//Material components
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';

//Custom components
import TalkInfo from '../Index/talkinfo';

//Style components
import makeStyles from '@material-ui/core/styles/makeStyles';

const useStyle = makeStyles(theme => ({
	root: {
		width: '50%',
		paddingBottom: '30px',
		backgroundColor: '#f9f9f9',
		[theme.breakpoints.down('md')]: {
			width: '60%',
		},
		[theme.breakpoints.down('sm')]: {
			width: '75%'
		},
		[theme.breakpoints.down('xs')]: {
			width: '95%',
			paddingTop: 15,
		}
	},
	socialIcons: {
		display: 'flex',
		justifyContent: 'center',
		marginBottom: 10,
		'& > div.MuiGrid-item': {
			margin: '0px 10px',
		},
		'& img': {
			height: 35,
			[theme.breakpoints.down('md')]: {
				height: 32
			},
			[theme.breakpoints.down('sm')]: {
				height: 28,
			},
		}
	},
	contactInfos: {
		alignItems: 'center',
		'& a': {
			color: '#313131',
			textDecoration: 'none',
			'&:hover': {
				color: '#f4ba88'
			}
		},
		[theme.breakpoints.down('sm')]: {
			fontSize: '0.9rem',
		}
	}
}));

const ContactForm = (props) => {
	const classes = useStyle();
	const links = [`https://facebook.com/cocaboarts`,`https://instagram.com/co.cabo.arts`];
	const socialIcons = ['Facebook', 'Instagram'].map((i, index) => {
		return <Grid item key={index}>
			<IconButton onClick={() => window.open(links[index])}>
				<img src={`/Utils/Social Icons/${i}.png`} />
			</IconButton>
		</Grid>
	});
	return (
		<Paper className={classes.root} elevation={2}>
			<Grid item xs={12} className={classes.infoContainer}>
				<TalkInfo title={props.title} placeholder={props.placeholder} />
			</Grid>
			<Grid item className={classes.socialIcons}>
				{socialIcons}
			</Grid>
			<Grid item className={classes.contactInfos} container direction={"column"}>
				<Grid item>
					<a href={"tel:+639364417852"}> +639364417852 </a>
				</Grid>
				<Grid item>
					<a href={"mailto:cocaboarts@gmail.com"}> cocaboarts@gmail.com </a>
				</Grid>
			</Grid>
		</Paper>
	);
}

export default ContactForm;