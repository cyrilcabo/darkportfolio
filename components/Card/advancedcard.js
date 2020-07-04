//Material components
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

//Custom components
import CardContent from './cardcontent';

const AdvancedCard = (props) => {
	return (
		<Paper>
			<Grid item xs={12} container>
				<Grid item xs={5} style={{backgroundColor: 'black'}}/>
				<Grid item xs={6} container style={{margin: 5}}>
					<CardContent />
				</Grid>
			</Grid>
		</Paper>
	);
}

export default AdvancedCard;