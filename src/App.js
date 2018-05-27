import React, { Component } from 'react';
import { observable, computed } from "mobx"
import { observer } from "mobx-react"
import styled from 'styled-components';
import Dropzone from "react-dropzone";
// import { apiRequest } from './lib/services';
import { Header } from "./components/header";
import { API_SERVER } from "./lib/constants";
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

const Page = styled.div`
    display: flex;
    flex-direction: column;
`

const Form = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: top;
`;

const Text = styled.div`
    display: flex;
    flex-direction: column;
    margin-right:50px;
`;

const UploadFileList = styled.div`
    margin-top:20px;
    margin-bottom: 10px;
    text-decoration: underline;
`;

@observer
class App extends Component {

    @observable line1 = "";
    @observable line2 = "";
    @observable file = {};
    @observable error = {};

    onDrop(acceptedFiles, rejectedFiles) {
        this.file = acceptedFiles[0];
    }

    @computed
    get line1Error() {
        return this.line1.length === 0;
    }

    @computed
    get formIsValid () {
        return this.line1.length > 0 && this.file.name !== undefined;
    }


    async handleUploadImage() {


        if (this.formIsValid) {

            const data = new FormData();

            const request = {
                method: "POST",
                body: data
            }

            const res = await fetch(API_SERVER + "/watermark", request);
            if (res.status === 200) {
                const blobFile = await res.blob();
                var blobURL = window.URL.createObjectURL(blobFile);

                const tempLink = document.createElement('a');
                tempLink.href = blobURL;
                tempLink.setAttribute('download', 'watermark.pdf');
                tempLink.click();
            }
            else if (res.status === 400) {
                const errorObject = await res.json();
                console.log(errorObject);
            }
            else {

            }
        }
    }

    setText(line, text) {
        this[line] = text;
    }

    render() {
        return (
            <Page className="App">
                <Header />
                <Form >
                    <Text>
                        <TextField
                            name="line1"
                            label="Text Line 1"
                            type="text"
                            placeholder="line1"
                            value={this.line1}
                            onChange={e => this.setText("line1", e.target.value)}
                            required={true}
                            error={this.line1Error}
                        />
                        <TextField
                            name="line2"
                            style={{ color: "#000" }}
                            label="Text Line 2"
                            type="text"
                            placeholder="line2"
                            value={this.line2}
                            onChange={e => this.setText("line2", e.target.value)} />
                        <UploadFileList>File to Watermark:</UploadFileList>
                        <div>{this.file.name || "-----------"}</div>
                    </Text>
                    <Dropzone accept={"application/pdf"} style={{ border: "1px dashed #000", width: "150px", padding: "20px", boxSizing: "borderBox" }} multiple={false} onDrop={(files) => this.onDrop(files)}>
                        <div>Drop files here or click to select files to upload</div>
                    </Dropzone>
                </Form >
                <Button
                    variant="raised" 
                    color="primary"
                    style={{ "width": "200px", "height": "40px", "margin": "40px auto 0",}}
                    onClick={() => this.handleUploadImage()}
                    disabled={!this.formIsValid}
                >
                    Watermark
                 </Button>
            </Page>
        );
    }
}

export default App;
