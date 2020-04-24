import React, { Component, ReactDOM } from 'react';
import AceEditor from "react-ace";
import { Switch, Select, Divider } from 'antd';
import styles from './CodeEditor.css'

import "ace-builds/src-noconflict/mode-java";
import "ace-builds/src-noconflict/mode-javascript";
import "ace-builds/src-noconflict/mode-python";
import 'ace-builds/src-noconflict/mode-sql';
import 'ace-builds/src-noconflict/mode-mysql';
import 'ace-builds/src-noconflict/mode-markdown';
import 'ace-builds/src-noconflict/mode-html';
import 'ace-builds/src-noconflict/mode-css';
import 'ace-builds/src-noconflict/mode-typescript';
import 'ace-builds/src-noconflict/mode-json';
import 'ace-builds/src-noconflict/mode-golang';
import "ace-builds/src-noconflict/theme-monokai";
import "ace-builds/src-noconflict/theme-github";
import 'ace-builds/src-noconflict/ext-language_tools';

class CodeEditor extends Component {

  state = {
    mode: 'java',
    theme: 'monokai',
    fontSize: 14,
    showGutter: true,
    highlightActiveLine: true,
    enableBasicAutocompletion: true,
    enableLiveAutocompletion: true,
    enableSnippets: true,
    showLineNumbers: true,
  }

  componentDidMount(): void {
    this.defaultHead(this.state.mode)
  }

  generatorMods = () => {
    let modes = ['java', 'javascript', 'python', 'mysql', 'markdown', 'html', 'css', 'typescript', 'json', 'golang']
    let arr = []
    modes.forEach((item, index) => {
      arr.push(this.option(item, index));
    })
    return arr;
  }

  generatorThemes = () => {
    let modes = ['monokai', 'github']
    let arr = []
    modes.forEach((item, index) => {
      arr.push(this.option(item, index));
    })
    return arr;
  }

  generatorFontSize = () => {
    let arr = []
    for (let i = 12; i < 38; i+=2) {
      arr.push(this.option(String(i), String(i)));
    }
    return arr;
  }

  option(param, index) {
    const { Option } = Select;
    return (
      <Option value={param} key={index}>{param}</Option>
    );
  }

  label = (str) => {
    return (
      <label className={styles.label}>{str}</label>
    )
  }

  switch = (onChange) => {
    return (
      <Switch checkedChildren="开" unCheckedChildren="关"
              defaultChecked
              onChange={(checked, event) => onChange(checked, event)}/>
    )
  }

  select = (defaultValue, onChange, options) => {
    return (
      <Select
        defaultValue={defaultValue}
        showSearch
        style={{ width: 200 }}
        placeholder="Select a language"
        optionFilterProp="children"
        onChange={(value) => onChange(value)}
        onFocus={() => console.log('onFocus')}
        onBlur={() => console.log('onBlur')}
        onSearch={(val) => console.log('search:', val)}
        filterOption={(input, option) => option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
      >
        {options}
      </Select>
    )
  }

  br = () => {
    return (
      <div className={styles.br} />
    )
  }

  defaultHead = (mode) => {
    let val = "";
    switch (mode) {
      case 'java':
        val = `class Main {
  public static void main(String[] args) {
    System.out.println("Hello World");
}`
        break;
      case 'python':
        val = `# !/usr/bin/env python
# coding=utf-8`
        break;
      default:
        break;
    }
    this.setState({
      code: val
    })
  }

  render() {

    return (
      <div>
        {this.label('Mode')}
        {this.select('java', (value) => {
          this.setState({
            mode: value
          });
          this.defaultHead(value);
        }, this.generatorMods())}

        <Divider type="vertical" />

        {this.label('Theme')}
        {this.select('monokai', (value) => this.setState({
          theme: value
        }), this.generatorThemes())}

        <Divider type="vertical" />

        {this.label('FontSize')}
        {this.select(14, (value) => this.setState({
          fontSize: value
        }), this.generatorFontSize())}

        {this.br()}

        {this.label('显示侧边栏')}
        {this.switch((checked, event) => {
          this.setState({
            showGutter: checked
          })
        })}

        <Divider type="vertical" />

        {this.label('显示行数')}
        {this.switch((checked, event) => {
          this.setState({
            showLineNumbers: checked
          })
        })}

        <Divider type="vertical" />

        {this.label('突出显示当前活跃行')}
        {this.switch((checked, event) => {
          this.setState({
            highlightActiveLine: checked
          })
        })}


        <Divider type="vertical" />

        {this.label('启用基本自动完成功能')}
        {this.switch((checked, event) => {
          this.setState({
            enableBasicAutocompletion: checked
          })
        })}

        <Divider type="vertical" />

        {this.label('启用智能提示')}
        {this.switch((checked, event) => {
          this.setState({
            enableLiveAutocompletion: checked
          })
        })}

        <Divider type="vertical" />

        {this.label('启用代码片段')}
        {this.switch((checked, event) => {
          this.setState({
            enableSnippets: checked
          })
        })}

        {this.br()}

        <AceEditor
          ref="codeEditor"
          mode={this.state.mode}
          theme={this.state.theme}
          width={1000}
          onChange={value => {// 输出代码编辑器内值改变后的值
             this.setState({
               code: value
             })
          }}
          value={this.state.code}
          name="ace_editor"
          fontSize={Number(this.state.fontSize)}
          showPrintMargin={false}
          showGutter={this.state.showGutter} // 侧边栏
          wrapEnabled
          highlightActiveLine={this.state.highlightActiveLine}  // 突出显示当前活跃行
          setOptions={{
            enableBasicAutocompletion: this.state.enableBasicAutocompletion,   // 启用基本自动完成功能
            enableLiveAutocompletion: this.state.enableLiveAutocompletion,   // 启用实时自动完成功能 （比如：智能代码提示）
            enableSnippets: this.state.enableSnippets,  // 启用代码段
            showLineNumbers: this.state.showLineNumbers, // 显示行数
            tabSize: 4 // 制表符
          }}
        />
      </div>
    )
  }
}


// Render editor
export default CodeEditor;

