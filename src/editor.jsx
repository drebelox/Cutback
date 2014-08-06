/** @jsx React.DOM */

var CodeMirrorEditor = React.createClass({
  componentDidMount: function() {

    this.editor = CodeMirror.fromTextArea(this.refs.editor.getDOMNode(), {
      mode: 'javascript',
      lineNumbers: true,
      lineWrapping: false,
      smartIndent: false,  // javascript mode does bad things with jsx indents
      matchBrackets: true,
      readOnly: this.props.readOnly
    });
    this.editor.on('change', this.onChange);
  },

  componentDidUpdate: function() {
    if (this.props.readOnly) {
      this.editor.setValue(this.props.codeText);
    }
  },

  onChange: function() {
    if (!this.props.readOnly) {
      this.props.onChange && this.props.onChange(this.editor.getValue());
    }
  },

  render: function() {
    return (
      <section className="editor">
        <div style={this.props.style} className={'panel' + (this.props.className ? this.props.className : '')}>
          <textarea ref="editor" defaultValue={this.props.codeText}/>
        </div>
      </section>
    );
  }
});