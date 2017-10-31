import { h, Component } from 'preact';
import { connect } from 'preact-redux';
import style from './style.less';
import { appUpdate } from 'src/actions/all';
class Profile extends Component {
	state = {
		count: 0
	};
	firstRun = true;
	// update the current time
	updateTime = () => {
		let time = new Date().toLocaleString();
		this.setState({ time });
	};

	// gets called when this route is navigated to
	componentDidMount() {
		
		
		let metas = [
			{name: "description", content: "Profile Description"},
			{property: "og:type", content: "article"}
		];
		this.props.dispatch(appUpdate({title:'Profile',metas: metas}))
		
		
		// start a timer for the clock:
		this.timer = setInterval(this.updateTime, 1000);
		this.updateTime();

		// every time we get remounted, increment a counter:
		this.setState({ count: this.state.count+1 });
	}

	// gets called just before navigating away from the route
	componentWillUnmount() {
		clearInterval(this.timer);
	}

	// Note: `user` comes from the URL, courtesy of our router
	render({ user }, { time, count }) {
		return (
			<div class={style.profile}>
		
				<h1>Profile: {user}</h1>
				<p>This is the user profile for a user named {user}.</p>

				<div>Current time: {time}</div>
				<div>Profile route mounted {count} times.</div>
			</div>
		);
	}
}

Profile.defaultProps = {
  title: ''
};


let select = (state, props) => {
	return {
		title: state.app.title
	}
};

export default connect(select)(Profile);
