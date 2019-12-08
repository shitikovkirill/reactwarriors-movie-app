import React, {Component} from "react";
import CallApi from "../../../api/request";
import PropTypes from "prop-types";

export default (ActionComponent) => class ActionHOC extends Component {

    static propTypes = {
        selected: PropTypes.bool,
        action: PropTypes.string.isRequired,
        media_id: PropTypes.number.isRequired,
    };

    constructor() {
        super();

        this.state = {
            isLoading: false,
            selected: false,
        };
    }

    componentDidMount() {
        let {selected = false} = this.props;
        this.setState({selected})
    }

    switchSelect = () => {
        this.setState({isLoading: true,});
        const {action, media_id, session_id, user,} = this.props;
        const {selected} = this.state;
        let url = `/account/${user.id}/${action}`;

        const params = {
            session_id
        };
        const body = {
            media_type: 'movie',
            media_id,
            [action]: !selected
        };
        CallApi.post(url, {
            params,
            body
        }).then(() => {
            this.setState((prevState) => {
                return {
                    isLoading: false,
                    selected: !prevState.selected
                }
            })
        });
    };

    render() {
        const {selected, isLoading} = this.state;
        return (
            <>
                {isLoading ? "Loading..." : <ActionComponent
                    selected={selected}
                    switchSelect={this.switchSelect}/>}
            </>
        );
    }
}