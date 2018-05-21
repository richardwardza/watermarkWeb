import React, { Component } from 'react';
import { observable } from "mobx"
import { observer } from "mobx-react"
import styled from 'styled-components';
import Dropzone from "react-dropzone";
// import { apiRequest } from './lib/services';
import { Header } from "./components/header";
import { API_SERVER } from "./lib/constants";

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

const TextLabel = styled.label`
    margin-top:20px;
`;


const TextInput = styled.input`
    height: 20px;
    margin-top:5px;
    padding: 8px;
    width: 250px;
`;

const UploadFileList = styled.div`
    margin-top:20px;
    margin-bottom: 10px;
`;

const WatermarkFile = styled.button`
    background-color: #f4f4f4;
    width: 200px;
    height: 40px;
    margin: 40px auto 0;
    cursor: pointer;
    &:hover {
        background-color: #d4d4d4;
    }
`

@observer
class App extends Component {

    @observable line1 = "";
    @observable line2 = "";
    @observable file = {};

    onDrop(acceptedFiles, rejectedFiles) {
        this.file = acceptedFiles[0];
    }


    async handleUploadImage() {
        const data = new FormData();

        const request = {
            method: "POST",
            body: data
        }

        const res = await fetch(API_SERVER + "/watermark", request);
        const blobFile = await res.blob();
        var blobURL = window.URL.createObjectURL(blobFile);

        const tempLink = document.createElement('a');
        tempLink.href = blobURL;
        tempLink.setAttribute('download', 'watermark.pdf');
        tempLink.click();
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
                        <TextLabel>Text Line 1</TextLabel>
                        <TextInput
                            type="text"
                            placeholder="line1"
                            value={this.line1}
                            onChange={e => this.setText("line1", e.target.value)} />
                        <TextLabel>Text Line 2</TextLabel>
                        <TextInput
                            type="text"
                            placeholder="line2"
                            value={this.line2}
                            onChange={e => this.setText("line2", e.target.value)} />
                        <UploadFileList>File to Watermark:</UploadFileList>
                        <div>{this.file.name || "-----------"}</div>
                    </Text>
                    <Dropzone accept={"application/pdf"} style={{border: "1px solid #000", width: "150px", padding: "20px", boxSizing:"borderBox"}} multiple={false} onDrop={(files) => this.onDrop(files)}>
                        <div>Drop files here or click to select files to upload</div>
                    </Dropzone>
                </Form >
                <WatermarkFile onClick={() => this.handleUploadImage()}>Watermark</WatermarkFile>
            </Page>
        );
    }
}

export default App;
