/** @jsx React.DOM */

var TabGroup = React.createClass({
  displayName:'TabGroup',
  getInitialState: function (){
    return {
      index: 0,
      buffer: []
    };
  },
  onEditorChange: function (e) {
    var buffers = this.state.buffer;
    buffers[this.state.index] = e;
    this.setState({buffer: buffers});
  },
  onFocus: function (e, props) {
    this.setState({index: props.key});
  },
  onClose: function (e, props) {
    this.props.onBufferClose(this.state.index);
    this.setState({index: 0});
  },
  render: function () {
    var self = this;
    var activeChild = null;

    return (
      <article className='editing'>
        <section className="tabs">
          {React.Children.map(this.props.children, function (child, index) {
            var isActive = (self.state.index === index);
            if (isActive) { activeChild = child; }
            return React.addons.cloneWithProps( child, {
              key: index,
              active: isActive,
              onFocus: self.onFocus,
              onClose: self.onClose
            });
          })}
        </section>
        {React.Children.map(this.props.children, function (child, index) {
          return  self.state.index === index ? <CodeMirrorEditor id={'editor-' + index} active={true} onChange={self.onEditorChange} codeText={self.state.buffer[index] || child.props.children}/> : null;
        })}
      </article>
    );
  }
});

var Tab = React.createClass({
  displayName:'Tab',
  onClick: function (e) {
    this.props.onFocus(e, this.props);
    e.preventDefault();
  },
  onClose: function (e) {
    this.props.onClose(e, this.props);
    e.preventDefault();
  },
  render: function () {
    return (
      <span className={'tab' + (this.props.active ? ' active' : '')} draggable="true">
        <a href='#' className="label" onClick={this.onClick}>{this.props.title}</a><a href="#" className="close" onClick={this.onClose}>x</a>
      </span>
    );
  }
});
