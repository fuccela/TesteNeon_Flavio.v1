import React, { Component, Fragment } from "react"
import PropTypes from "prop-types"
import { withStyles } from "@material-ui/core/styles"
import { Grid, FormControl, InputLabel, Select, Input, MenuItem, Button, Chip } from "@material-ui/core"
import { withRouter } from "react-router-dom"
import axios from "axios"

import { APIv1 } from "../../config/constants"

const styles = () => ({
    root: {
        display: "flex"
    },
    content: {
        flexGrow: 1,
        height: "100vh",
        overflow: "hidden"
    }
})

class Conversion extends Component {
    constructor(props) {
        super(props)

        this.state = {
            currencies: [],
            currencyFrom: "USD",
            currencyTo: "BRL",
            currencyValue: 0.0,
            result: 0.0
        }

        this.loadCurrency = this.loadCurrency.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.handleChangeValue = this.handleChangeValue.bind(this)
        this.handleSend = this.handleSend.bind(this)
    }

    componentWillMount() {
        this.loadCurrency()
    }

    loadCurrency = async () => {
        await axios.get(`${APIv1}/currencies`, {
            crossdomain: true
        })
        .then(resp => {
            this.setState({ 
                ...this.state, 
                currencies: resp.data               
            })
        })

        // this.setState({
        //     ...this.state,
        //     currencies: ["USD", "BRL", "EUR", "CAD"]
        // })
    }

    handleChange = async (event) => {
        this.setState({
            ...this.state,
            [event.target.name]: event.target.value
        })
    }

    handleChangeValue = async (event) => {
        await this.setState({
            ...this.state,
            "currencyValue": event.target.value
        })
    }

    handleSend = async () => {
        await axios.get(`${APIv1}/conversion?currencyFrom=${this.state.currencyFrom}&currencyTo=${this.state.currencyTo}&amount=${this.state.currencyValue}`)
        .then(resp => {
            this.setState({ 
                ...this.state, 
                result: resp.data.valueCurrency
            })
        })

        await this.setState({ 
            ...this.state, 
            result: this.state.result
        })
    }

    render() {
        const { classes } = this.props

        return (
            <Fragment>
                <Grid container spacing={24}>
                    <Grid item xs={3}>
                        <FormControl className={classes.formControl} fullWidth>
                            <InputLabel shrink htmlFor="currencyFrom-label-placeholder">
                                Currency From
                            </InputLabel>
                            <Select
                                fullWidth
                                value={this.state.currencyFrom}
                                onChange={this.handleChange}
                                input={<Input name="currencyFrom" id="currencyFrom-label-placeholder" />}
                                displayEmpty
                                name="currencyFrom"
                                className={classes.selectEmpty}>
                                {this.state.currencies.map((currency) => <MenuItem key={currency.Key} value={currency.Key}>{currency.Key + "-" + currency.Value}</MenuItem>)}
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={3}>
                        <FormControl className={classes.formControl} fullWidth>
                            <InputLabel shrink htmlFor="currencyTo-label-placeholder">
                                Currency To
                            </InputLabel>
                            <Select
                                fullWidth
                                value={this.state.currencyTo}
                                onChange={this.handleChange}
                                input={<Input name="currencyTo" id="currencyTo-label-placeholder" />}
                                displayEmpty
                                name="currencyTo"
                                className={classes.selectEmpty}>
                                {this.state.currencies.map((currency) => <MenuItem key={currency.Key} value={currency.Key}>{currency.Key + "-" + currency.Value}</MenuItem>)}
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={3}>
                        <FormControl className={classes.margin} fullWidth>
                            <InputLabel
                                htmlFor="value"
                                classes={{
                                    root: classes.cssLabel,
                                    focused: classes.cssFocused,
                                }}>
                                Value
                            </InputLabel>
                            <Input
                                fullWidth
                                id="value"
                                type="number"
                                value={this.state.currencyValue}
                                onChange={this.handleChangeValue}
                                classes={{ underline: classes.cssUnderline }} />
                        </FormControl>
                    </Grid>
                    <Grid item xs={3}>
                        <Button 
                            variant="contained" 
                            className={classes.button} 
                            onClick={this.handleSend}>
                            Send
                        </Button>
                    </Grid>
                </Grid>
                <Chip label={`Result ${this.state.result}`} className={classes.chip} />
            </Fragment>
        )
    }
}

Conversion.propTypes = {
    classes: PropTypes.object.isRequired,
    theme: PropTypes.object.isRequired
}

export default withRouter(withStyles(styles, { withTheme: true })(Conversion))