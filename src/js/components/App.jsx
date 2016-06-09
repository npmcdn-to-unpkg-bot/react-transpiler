import React from 'react';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { tomorrow } from 'react-syntax-highlighter/dist/styles';

function _configureEditor(editor) {
	editor.setTheme('ace/theme/tomorrow');
	editor.getSession().setTabSize(2);
	editor.getSession().setMode('ace/mode/javascript');
	editor.setHighlightActiveLine(false);

	editor.focus();
}

const Feedback = ({ error }) => (
	<div className="feedback">
		<pre>
			{ error }
		</pre>
	</div>
);

const App = React.createClass({
	componentDidMount() {
		const editor = ace.edit('input');

		_configureEditor(editor);

		editor.on('change', () => {
			const input = editor.getValue();

			this.parseInput(input);
		});

		this.editor = editor;
	},

	componentWillUnmount() {
		this.editor.destroy();
	},

	getInitialState() {
		return {
			transpiled: '',
			error: ''
		};
	},

	parseInput(input) {
		try {
			const { code } = Babel.transform(input, {
				presets: [ 'es2015', 'react' ]
			});

			this.setState({
				transpiled: code,
				error: ''
			});
		} catch ({ message }) {
			this.setState({
				error: message
			});
		}
	},

	render() {
		const { transpiled, error } = this.state;

		return (
			<section>
				<div className={ error ? 'editor-error' : 'editor' }>
					<div id="input" />

					<SyntaxHighlighter
						className="output"
						language='javascript'
						style={ tomorrow }
					>
						{ transpiled }
					</SyntaxHighlighter>
				</div>

				{ error && <Feedback error={ error } /> }
			</section>
		);
	}
});

export default App;
