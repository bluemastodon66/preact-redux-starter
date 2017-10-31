import { h, Component } from 'preact';
import { connect } from 'preact-redux';
import { Router } from 'preact-router';
import AsyncRoute from 'preact-async-route';
import { appUpdate } from 'src/actions/all';
import Helmet from "preact-helmet";
import Header from './header';
import Home from './home';
import Profile from './profile';
import style from './style.less';
class App extends Component {

	constructor(props) {
		super(props);
	}
	handleRoute = e => {			
		let {url,previous} = e;		
		this.props.dispatch(appUpdate({ path: url}))
//		this.setState({ helmet: el });
	};

	render() {
		return (
			<div id="app" class={style.app}>
				<Helmet
					htmlAttributes={{lang: "zh-tw", amp: undefined}} // amp takes no value
					title={this.props.title}
					titleTemplate="我的網站 - %s"
					defaultTitle="預設標題"
					titleAttributes={{itemprop: "name", lang: "zh-tw"}}
					meta={this.props.metas}
				/>	
					
				<Header />
	
				<h1>路徑：{this.props.path}</h1>
				<Router onChange={this.handleRoute}>
					<Home path="/" />
					<Profile path="/profile/" user="訪客" />
					<Profile path="/profile/:user" />
					<AsyncRoute path="/test" getComponent={ () => import(/* webpackChunkName: "dynamic" */'./Dynamic').then(module => module.default) }
					loading={ () => <div>loading...</div> } />
				</Router>
			</div>
		);
	}
}

App.defaultProps = {
  title: '',
  path: '',
  metas: null
};


let select = (state, props) => {

	return {
		title: state.app.title,
		path: state.app.path,
		metas: state.app.metas
	}
};

export default connect(select)(App);

