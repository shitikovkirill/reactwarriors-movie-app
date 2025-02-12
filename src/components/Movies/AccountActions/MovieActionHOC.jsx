import React, {Component} from "react";
import CallApi from "../../../api/request";
import PropTypes from "prop-types";

export default (ActionComponent) => class MovieAction extends Component {

    static propTypes = {
        selected: PropTypes.bool,
        action_type: PropTypes.string.isRequired,
        media_id: PropTypes.number.isRequired,
    };

    constructor(props) {
        super(props);

        this.state = {
            isLoading: false,
            selected: props.selected,
        };
    }

    switchSelect = () => {
        const {action_type, media_id, session_id, user, toggleLoginForm} = this.props;
        if (!session_id) {
            toggleLoginForm();
            return;
        }
        this.setState({isLoading: true,});
        const {selected} = this.state;
        let url = `/account/${user.id}/${action_type}`;

        const params = {
            session_id
        };
        const body = {
            media_type: 'movie',
            media_id,
            [action_type]: !selected
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
        return <ActionComponent
            disable={isLoading}
            selected={selected}
            switchSelect={this.switchSelect}/>
    }
}