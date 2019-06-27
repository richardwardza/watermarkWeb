
import { observable, computed, action } from "mobx";

export class WatermarkStore {

    @observable line1 = "";
    @observable line2 = "";
    @observable file = {};
    @observable error = {};
    @observable processing: boolean = false;

    onDrop(acceptedFiles, rejectedFiles) {
        this.file = acceptedFiles[0];
    }

    @computed
    get line1Error() {
        return this.line1.length === 0;
    }

    @computed
    public get formIsValid() {
        return this.line1.length > 0 && this.file.name !== undefined;
    }


    public async handleUploadImage() {


        if (this.formIsValid) {

            const data = new FormData();
            data.append("file", this.file);
            data.append("line1", this.line1);
            data.append("line2", this.line2);

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

    public setText(line, text) {
        this[line] = text;
    }

}