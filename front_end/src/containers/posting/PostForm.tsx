import React from "react";
import axios from "axios";
import { connect } from "react-redux";
import * as postingActions from "redux/modules/posting";
import { bindActionCreators } from "redux";
import LinkButton from "components/button/LinkButton";
import GoBackButton from "components/button/GoBackButton";
import { Form, TextArea } from "semantic-ui-react";
import { Checkbox } from "semantic-ui-react";
import storage from "lib/storage";
import { Link } from "react-router-dom";
let token = storage.get("token");

class PostingForm extends React.Component<any, any> {
  state = {
    p_status: "1"
  };

  componentWillMount() {
    const { PostingActions } = this.props;
    PostingActions.initializeForm("posting");
  }

  handleChange = (e: any) => {
    const { PostingActions } = this.props;
    var { id, value } = e.target;
    // console.log(value)
    PostingActions.changeInput({
      id,
      value,
      form: "posting"
    });
  };

  handleFileSelect = (e: any) => {
    const { PostingActions } = this.props;
    var id = e.target.id;
    var value = e.target.files;
    for (let i = 0; i < value.length; i++) {
      PostingActions.changeFileInput(value[i]);
    }
  };

  handleStatusChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      p_status: e.target.value
    });
    console.log(this.state.p_status);
  };

  handleSubmit = (e: any) => {
    e.preventDefault();
    const { p_content, m_id } = this.props.form.toJS();
    const { selectedfiles } = this.props;
    var v_id = this.props.match.params.id;
    var p_status = this.state.p_status;
    console.log(selectedfiles);

    const files = new FormData();
    for (let j = 0; j < selectedfiles.length; j++) {
      files.append("files", selectedfiles[j]);
    }
    const post = {
      p_content,
      v_id,
      p_status,
      m_id
    };

    axios
      .post("http://i02a205.p.ssafy.io:8080/A205/rest/Post", post, {
        headers: { Authorization: "Bearer " + token }
      })
      .then(res => {
        console.log(res);
      })
      .catch(err => console.log(err));
    console.log(post, files);

    axios
      .post("http://i02a205.p.ssafy.io:8080/rest/PostFile", files, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: "Bearer " + token
        }
      })
      .then(res => {
        console.log(res);
      })
      .catch(err => console.log(err));
    this.props.history.push(`/${v_id}/list`);
  };

  render() {
    const { selectedFiles, p_content } = this.props.form;
    var v_id = this.props.match.params.id;
    console.log(this.props);
    console.log(v_id);
    return (
      <Form>
        <label>
          <input
            type="radio"
            value="1"
            checked={this.state.p_status === "1"}
            onChange={this.handleStatusChange}
          />
          모집
        </label>
        <label>
          <input
            type="radio"
            value="2"
            checked={this.state.p_status === "2"}
            onChange={this.handleStatusChange}
          />
          후기
        </label>
        <TextArea
          value={p_content}
          className="posting"
          name="content"
          id="p_content"
          placeholder="내용을 입력하세요."
          onChange={this.handleChange}
        />
        <input
          type="file"
          id="files"
          multiple
          onChange={this.handleFileSelect}
          value={selectedFiles}
        />
        <label htmlFor="files">이미지 업로드</label>
        {/* {imagepreview} */}

        <button onClick={this.handleSubmit}>게시글 등록하기</button>

        <GoBackButton text="취소하기" />
      </Form>
    );
  }
}

export default connect(
  (state: any) => ({
    form: state.posting.getIn(["posting", "form"]),
    selectedfiles: state.posting.get("selectedfiles"),
    result: state.posting.get("result")
  }),
  dispatch => ({
    PostingActions: bindActionCreators(postingActions, dispatch)
  })
)(PostingForm);
