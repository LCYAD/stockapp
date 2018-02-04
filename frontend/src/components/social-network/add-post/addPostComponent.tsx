import * as React from 'react'; 
import { Button, Modal } from 'semantic-ui-react';
import axios from 'axios';
//import Post from '../post.model'

var iconStyle = {
    width: 28,
    color: 'grey',}

var textareaStyle = {
    width: '100%',
    height: '30vh',
}

var inputFileStyle = {
    visibility: "hidden"
}

var previewStyle = {
    width: '25%'
}

var buttonStyle = {
    float : 'right',
    marginBottom : '20px'
}

export default class AddPostComponent extends React.Component<any,any> {
  
    state = { size: '', open: false, msg: [], file: [], imagePreviewUrl: [], imageURL: []}

    show = (size:any) => () => this.setState({ size, open: true })
    close = () => this.setState({ open: false })

    postMsg: string = "";
    postFile = [];

    ComponentDidMount() {
    }

    uploadFile() {
        var uploadButton = document.getElementById("uploadInput");
        if (uploadButton) {
            uploadButton.click();
        }
    }

    handleSubmit(e:any) {
        e.preventDefault();
        this.setState({
            msg: /*[...this.state.msg, this.postMsg]*/ this.postMsg,
        }, () => {
            console.log(this.state);
            console.log('handle uploading-', this.state.file);
            console.log('handle uploading-msg', this.state.msg);

            if (this.state.file.length > 0) {
                const formData = new FormData();
                for (var i=0; i< this.state.file.length; i++) {
                    formData.append("file", this.state.file[i]);
                    //formData.append("tags", `codeinfuse, medium, gist`);
                    formData.append("upload_preset", "idzxgzjw"); // Replace the preset name with your own
                    formData.append("api_key", "573954122199244"); // Replace API key with your own Cloudinary key
                    formData.append("timestamp", Date.now().toString());
                }
                axios.post("https://api.cloudinary.com/v1_1/codeinfuse/image/upload", formData, {
                    headers: { "X-Requested-With": "XMLHttpRequest" },
                    }).then((response:any) => {
                    const data = response.data;
                    const fileURL = data.secure_url; // You should store this URL for future references in your app
                    console.log(data);
                    console.log(fileURL);
                    this.setState({ 
                        imageURL: [...this.state.imageURL, fileURL],
                        open: false
                    }, () => {
                        console.log(this.state);
                    });
                });
            } else {
                this.setState({ open:false });
            }    
        });
        //this.setState({ open: false });
    }
    
    handleMsgChange(e:any) {
        e.preventDefault();
        this.postMsg = e.target.value;
    }

    handleImageAdd(e:any) {
        e.preventDefault();
        let reader = new FileReader();
        let file = e.target.files[0];
    
        reader.onloadend = () => {
          this.setState({
            file: [...this.state.file, file],
            imagePreviewUrl: [...this.state.imagePreviewUrl, reader.result]
          });
        }        

        reader.readAsDataURL(file)
    }
    
    render() {
        const { open } = this.state
        let {imagePreviewUrl} = this.state;
        let $imagePreview = null;
        if (imagePreviewUrl) {
            $imagePreview = imagePreviewUrl.map((img: any, i: number) => {
                if (img !== "") {
                    return (
                        <img key={i} src={img} style={previewStyle}/>
                    );
                }
                else
                    return ({});
            });
        } else {
            $imagePreview = (<div className="previewText" style={previewStyle}> </div>);
        }
        return (
            <div>
                <Button onClick={this.show('small')}>New Post</Button>
                <Modal size={'small'} open={open} onClose={this.close}>
                    <Modal.Header>
                        Create your Post
                    </Modal.Header>
                    <Modal.Content>
                        <form onSubmit={(e)=>this.handleSubmit(e)}>
                            <textarea placeholder={"Write your content here."} onChange={(e)=>this.handleMsgChange(e)} style={textareaStyle}/>
                            <div>
                                <i id="uploadIcon" className="fa fa-image fa-2x" style={iconStyle} onClick={()=>this.uploadFile()}></i>
                                <input id="uploadInput" type="file" className="fileInput" onChange={(e)=>this.handleImageAdd(e)} style={inputFileStyle}/>
                            </div>
                            <div className="imgPreview">
                                {$imagePreview}
                            </div>
                            <Button className="submitButton ui clearing segment" type="submit" onClick={(e)=>this.handleSubmit(e)} style={buttonStyle}>POST</Button>
                        </form>
                    </Modal.Content>
                </Modal>   
            </div>
        );
    }
}
