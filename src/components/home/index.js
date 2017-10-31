import { connect } from 'preact-redux';
import { h, Component } from 'preact';
import style from './style.less';

import { appUpdate } from 'src/actions/all';
class Home extends Component {
	componentDidMount() {	
		let metas = [
			{name: "description", content: "網站描述"},
			{property: "og:type", content: "article"}
		];
		this.props.dispatch(appUpdate({title:'首頁',metas: metas}));
	}
	render() {
		return (
			<div class={style.home}>
		
				<h1>The Title is::: {this.props.title}</h1>
				<p>This is the Home component.</p>
			</div>
		);
	}
}

Home.defaultProps = {
  title: ''
};


let select = (state, props) => {
	return {
		title: state.app.title
	}
};

export default connect(select)(Home);