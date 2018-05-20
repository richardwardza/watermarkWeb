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


@observer
class App extends Component {

    @observable line1 = "";
    @observable line2 = "";

    onDrop(acceptedFiles, rejectedFiles) {
        this.handleUploadImage(acceptedFiles);
    }


    async handleUploadImage(files) {

        const data = new FormData();
        data.append('file', files[0]);
        data.append('line1', this.line1);
        data.append('line2', this.line2);

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
                    </Text>
                    <Dropzone accept={"application/pdf"} multiple={false} onDrop={(files) => this.onDrop(files)}>
                        <div>Try dropping some files here, or click to select files to upload.</div>
                    </Dropzone>
                </Form >
            </Page>
        );
    }
}

export default App;
