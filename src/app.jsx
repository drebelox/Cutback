/** @jsx React.DOM */

var App = React.createClass({
  displayName: 'Cutback',
  getInitialState: function () {
    return {
      buffers: this.props.buffers || []
    };
  },
  onCloseBuffer: function (e) {
    var buffers = this.state.buffers.splice(e,1);
    this.setState({buffers: buffers});
  },
  render: function () {
    return (
      <div id="app-container">
        <header className='titlebar'>
          <div className="window-controls">
            <a className='close' href=''>x</a>
            <a className='min'>-</a>
            <a className='max'>+</a>
          </div>
          <div className="app-name">Cutback</div>
          <ul className='toolbar'>
            <li>File
              <ul className='menu'>
                <li>New File</li>
                <li>Open</li>
                <li>Extended</li>
                <li className='parent'>Options
                  <ul className='menu'>
                    <li>Extended</li>
                    <li className='parent'>Options
                      <ul className='menu'>
                        <li>Extended</li>
                        <li className='parent'>Options
                          <ul className='menu'>
                            <li>Options</li>
                          </ul>
                        </li>
                      </ul>
                    </li>
                  </ul>
                </li>
              </ul>
            </li>
            <li>Edit</li>
            <li>Selection</li>
            <li>Find</li>
            <li>View</li>
            <li>Goto</li>
            <li>Tools</li>
            <li>Project</li>
            <li>Window</li>
            <li>Help</li>
          </ul>
        </header>
        <main className="central">
          <nav className="project show">
            <div className="tree">
              <ul>
                <li className=""><a tabIndex="-1" className="directory" href="#" data-full-path="/app">learnstoryboards</a>
                  <ul>
                    <li className=""><a tabIndex="-1" className="file" href="#" command="null" data-full-path="/app/lib">lib</a></li>
                  </ul>
                </li>
                <li className=""><a tabIndex="-1" className="file" href="#" command="null" data-full-path="/app/Readme.md">Readme.md</a></li>
              </ul>
            </div>
          </nav>
          <TabGroup onBufferClose={this.onCloseBuffer}>
            {this.state.buffers.map(function (buff){
              return (
                <Tab title={buff.name} path={buff.path}>
                  {buff.content}
                </Tab>
              );
            })}
          </TabGroup>
          <TabGroup>
            <Tab title='untitled.txt' active={true}>
              Test Me Out
            </Tab>
          </TabGroup>
        </main>
        <footer>
          <div className="bottom-bar">
            <div className="status-text">1:1</div>
            <div className="mode-theme">
              <select className="syntax" command="session:syntax" tabIndex="-1" title="Select syntax">
                <option value="golang">Go</option>
                <option value="javascript">JavaScript</option>
              </select>
              <select className="theme" command="editor:theme" tabIndex="-1" title="Select editor theme">
                <option value="monokai">Monokai</option>
                <option value="twilight">Twilight</option>
              </select>
            </div>
          </div>
          <div className="command-line">
            <input type="text" placeholder="cutback:command arguments"> <a command="app:hide-prompt" className="close" title="Hide prompt">×</a></input>
          </div>
          <div className="palette enter">
            <div className="main">
              <h1 className="mode"></h1>
              <input className="request"></input>
            </div>
            <ul className="results"></ul>
          </div>
        </footer>
      </div>
    );
  }
});

React.renderComponent(<App buffers={[{name:'untitled.text', content:'hello world'}, {name:'untitled2.txt', content:'hello bodhi'}]}/>, document.getElementById('body'))