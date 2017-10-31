import { h, Component } from 'preact';
import { connect } from 'preact-redux';
import style from './style.less';

import { appUpdate } from 'src/actions/all';
class Dynamic extends Component {
	state = {
		count: 0
	};

	// update the current time
	updateTime = () => {
		let time = new Date().toLocaleString();
		this.setState({ time });
	};


	// gets called when this route is navigated to
	componentDidMount() {
		let metas = [
			{name: "description", content: "動態加載 des"},
			{property: "og:type", content: "article"}
		];
		this.props.dispatch(appUpdate({title:'動態加載',metas: metas}))
		
		// start a timer for the clock:
		this.timer = setInterval(this.updateTime, 5000);
		this.updateTime();

		// every time we get remounted, increment a counter:
		this.setState({ count: this.state.count+1});
	}

	// gets called just before navigating away from the route
	componentWillUnmount() {
		clearInterval(this.timer);
	}

	// Note: `user` comes from the URL, courtesy of our router
	render({ user }, { time, count }) {
		return (
			<div class={style.dynamic}>
		
			
				<h1>Dynamic</h1>
				<p>Lazy Load</p>

				<div>Current time: {time}</div>
				<div>Profile route mounted {count} times.</div>
			</div>
		);
	}
}
Dynamic.defaultProps = {
  title: ''
};


let select = (state, props) => {
	return {
		title: state.app.title
	}
};

export default connect(select)(Dynamic);