import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Accordion from '@material-ui/core/Accordion'
import AccordionSummary from '@material-ui/core/AccordionSummary'
import AccordionDetails from '@material-ui/core/AccordionDetails'
import Typography from '@material-ui/core/Typography'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%'
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular
  },
  summary: {
    background: '#002856',
    color: 'white'
  }
}))

export default function Comments ({ title, details }) {
  const classes = useStyles()

  return (
    <div className={classes.root}>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon style={{ color: 'white' }} />}
          aria-controls='panel1a-content'
          id='panel1a-header'
          className={classes.summary}
        >
          <Typography className={classes.heading}>{title}</Typography>{' '}
        </AccordionSummary>
        <AccordionDetails> {details}</AccordionDetails>
      </Accordion>
    </div>
  )
}
