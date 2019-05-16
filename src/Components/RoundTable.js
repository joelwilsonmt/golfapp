import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableFooter from '@material-ui/core/TableFooter';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

require('dotenv').config();

const styles = theme => ({
  root: {
    width: '100%',
    overflowX: 'auto',
  },
  table: {
    maxWidth: '100%',
  },
  head: {
    position: 'sticky'
  },
  row: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.background.default,
    },
  },
  bottomRow: {
    backgroundColor: '#000',
    color: 'white'
  },
  overPar: {
    backgroundColor: 'red',
    color: 'white'
  },
  underPar: {
    backgroundColor: 'green',
    color: 'white'
  }
});

function RoundTable(props) {
  const {classes} = props;
  const game = props.game;
  const courseName = game.courseName;
  const players = game.players;
  const numberOfHoles = players ? players[0].holes.length : null;
  const styles={
    bold: {
      fontWeight: "bold"
    }
  }
  let totalPar = 0;
  players[0].holes.forEach(hole => totalPar += hole.par ? hole.par : 0);
  const playerScores = players ? players.map(player => {
    let totalScore = 0;
    player.holes.forEach(hole => {
      totalScore += hole.strokes ? hole.strokes : 0;
    });
    return totalScore;
  }) : null;
  return (
    <Paper className={classes.root}>
      <Table padding="dense" className={classes.table}>
        <TableHead>
          <TableRow className={classes.head}>
            <TableCell>Hole</TableCell>
            <TableCell align="right">Par</TableCell>
            {players.map(player =>
            <TableCell align="right">{player.name}</TableCell>
            )}
          </TableRow>
        </TableHead>
        <TableBody stripedRows>
          {Array(...Array(numberOfHoles)).map((hole, i) => (
            <TableRow className={classes.row} key={i}>
              <TableCell style={styles.bold} component="th" scope="row">
                Hole {i+1}
              </TableCell>
              <TableCell align="right">{players[0].holes[i].par}</TableCell>
              {players.map((player, j) => {
                return <TableCell 
                  className={typeof player.holes[i].par === 'undefined' ? null : player.holes[i].strokes > player.holes[i].par ? classes.overPar : classes.underPar} 
                  align="right">
                  {player.holes[i].strokes ? player.holes[i].strokes : '-'}
                </TableCell>
              })}
            </TableRow>
          ))}
          
          </TableBody>
          <TableFooter >
            <TableRow>
              <TableCell className={classes.bottomRow}>TOTALS</TableCell>
              <TableCell className={classes.bottomRow} align="right">Par</TableCell>
              {players.map(player =>
              <TableCell className={classes.bottomRow} align="right">{player.name}</TableCell>
              )}
            </TableRow>
            <TableRow >
              <TableCell className={classes.bottomRow} style={styles.bold} align="left"></TableCell>
              <TableCell className={classes.bottomRow} align="right">{totalPar}</TableCell>
              {players.map((player, i) => {
                    return <TableCell className={classes.bottomRow} align="right">{playerScores[i]}</TableCell>
              })}
            </TableRow>
            <TableRow className={classes.bottomRow}>
              <TableCell className={classes.bottomRow} style={styles.bold} align="left">Par +/-</TableCell>
              <TableCell className={classes.bottomRow} align="right">-</TableCell>
              {players.map((player, i) => {
                  return <TableCell className={playerScores[i]-totalPar > 0 ? classes.overPar : classes.underPar} align="right">{playerScores[i]-totalPar >= 0 ? `+${playerScores[i]-totalPar}` : `${playerScores[i]-totalPar}`}</TableCell>
              })}
            </TableRow>
          </TableFooter>
      </Table>
    </Paper>
  );
}

RoundTable.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(RoundTable);
