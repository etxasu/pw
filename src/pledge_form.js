import React from 'react'

class PledgeForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {name: ''}

        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.renderUpdate = this.renderUpdate.bind(this)
        this.renderCommit = this.renderCommit.bind(this)
    }

    // Handles when text is entered into the input field
    handleChange(event) {
        this.setState({name: event.target.value})
    }

    // Handles when the submit button is clicked
    handleSubmit(event) {
        event.preventDefault()
        this.props.pledgeSubmit(this.state.name)
    }

    render() {
        return (
            <div>
                {this.props.alreadyDone ? this.renderUpdate() : this.renderCommit()}
            </div>
        )
    }

    renderUpdate() {
        return(
            <form onSubmit={this.handleSubmit}>
                <div className="form-group">
                    <input value={this.state.name} onChange={this.handleChange} type="text" name="name" className="form-control" id="name"></input>
                    <br />
                    <input type="submit" value="Update" className="btn btn-primary"></input>
                </div>
            </form>
        )
    }

    renderCommit() {
        return(
            <form onSubmit={this.handleSubmit}>
                <div className="form-group">
                    <input value={this.state.name} onChange={this.handleChange} type="text" name="name" className="form-control" id="name"></input>
                </div>
                <br />
                <input type="submit" value="Commit" className="btn btn-primary"></input>
            </form>
        )
    }
}

export default PledgeForm