// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Dropzone from 'react-dropzone';
import ReactCrop, { makeAspectCrop } from 'react-image-crop';
import styled from 'styled-components';
import { Button } from '../../ui/components';
import { uploadFile } from 'grow-actions/upload-file/upload-file';
import { hideModal } from '../../ui/modal/actions/actions-modal';
import {
  UPLOAD_PROFILE_PICTURE_FILE_SUCCESS,
  DELETE_FROM_LIST,
} from 'grow-actions/upload-file/constants';
import { AuthLoaderAnimation } from 'gac-ui/components';

const FileUploadContainer = styled.div`
  display: block;
  width: 100%;
  width: 820px;

  .ReactCrop {
    position: relative;
    display: inline-block;
    cursor: crosshair;
    overflow: hidden;
    max-width: 100%;
    background-color: #fff;
  }
  .ReactCrop:focus {
    outline: none;
  }
  .ReactCrop--disabled {
    cursor: inherit;
  }
  .ReactCrop__image {
    display: block;
    max-width: 100%;
    height: 336px;
  }
  .ReactCrop--crop-invisible .ReactCrop__image {
    opacity: 0.5;
  }
  .ReactCrop__crop-selection {
    position: absolute;
    top: 0;
    left: 0;
    transform: translate3d(0, 0, 0);
    box-sizing: border-box;
    cursor: move;
    box-shadow: 0 0 0 9999em rgba(255, 255, 255, 0.42);
    border: 1px solid;
    border-image-slice: 1;
    border-image-repeat: repeat;
  }
  .ReactCrop--disabled .ReactCrop__crop-selection {
    cursor: inherit;
  }
  .ReactCrop__drag-handle {
    position: absolute;
    width: 10px;
    height: 10px;
    background-color: rgba(255, 255, 255, 1);
    border: 1px solid #474a4f;
    box-sizing: border-box;
    outline: 1px solid transparent;
  }
  .ReactCrop .ord-nw {
    top: 0;
    left: 0;
    margin-top: -5px;
    margin-left: -5px;
    cursor: nw-resize;
  }
  .ReactCrop .ord-n {
    top: 0;
    left: 50%;
    margin-top: -5px;
    margin-left: -5px;
    cursor: n-resize;
  }
  .ReactCrop .ord-ne {
    top: 0;
    right: 0;
    margin-top: -5px;
    margin-right: -5px;
    cursor: ne-resize;
  }
  .ReactCrop .ord-e {
    top: 50%;
    right: 0;
    margin-top: -5px;
    margin-right: -5px;
    cursor: e-resize;
  }
  .ReactCrop .ord-se {
    bottom: 0;
    right: 0;
    margin-bottom: -5px;
    margin-right: -5px;
    cursor: se-resize;
  }
  .ReactCrop .ord-s {
    bottom: 0;
    left: 50%;
    margin-bottom: -5px;
    margin-left: -5px;
    cursor: s-resize;
  }
  .ReactCrop .ord-sw {
    bottom: 0;
    left: 0;
    margin-bottom: -5px;
    margin-left: -5px;
    cursor: sw-resize;
  }
  .ReactCrop .ord-w {
    top: 50%;
    left: 0;
    margin-top: -5px;
    margin-left: -5px;
    cursor: w-resize;
  }
  .ReactCrop__disabled .ReactCrop__drag-handle {
    cursor: inherit;
  }
  .ReactCrop__drag-bar {
    position: absolute;
  }
  .ReactCrop__drag-bar.ord-n {
    top: 0;
    left: 0;
    width: 100%;
    height: 6px;
    margin-top: -4px;
  }
  .ReactCrop__drag-bar.ord-e {
    right: 0;
    top: 0;
    width: 6px;
    height: 100%;
    margin-right: -4px;
  }
  .ReactCrop__drag-bar.ord-s {
    bottom: 0;
    left: 0;
    width: 100%;
    height: 6px;
    margin-bottom: -4px;
  }
  .ReactCrop__drag-bar.ord-w {
    top: 0;
    left: 0;
    width: 6px;
    height: 100%;
    margin-left: -4px;
  }
  .ReactCrop--new-crop .ReactCrop__drag-bar,
  .ReactCrop--new-crop .ReactCrop__drag-handle,
  .ReactCrop--fixed-aspect .ReactCrop__drag-bar {
    display: none;
  }
  .ReactCrop--fixed-aspect .ReactCrop__drag-handle.ord-n,
  .ReactCrop--fixed-aspect .ReactCrop__drag-handle.ord-e,
  .ReactCrop--fixed-aspect .ReactCrop__drag-handle.ord-s,
  .ReactCrop--fixed-aspect .ReactCrop__drag-handle.ord-w {
    display: none;
  }
  @media (max-width: 768px) {
    .ReactCrop__drag-handle {
      width: 17px;
      height: 17px;
    }
    .ReactCrop .ord-nw {
      margin-top: -9px;
      margin-left: -9px;
    }
    .ReactCrop .ord-n {
      margin-top: -9px;
      margin-left: -9px;
    }
    .ReactCrop .ord-ne {
      margin-top: -9px;
      margin-right: -9px;
    }
    .ReactCrop .ord-e {
      margin-top: -9px;
      margin-right: -9px;
    }
    .ReactCrop .ord-se {
      margin-bottom: -9px;
      margin-right: -9px;
    }
    .ReactCrop .ord-s {
      margin-bottom: -9px;
      margin-left: -9px;
    }
    .ReactCrop .ord-sw {
      margin-bottom: -9px;
      margin-left: -9px;
    }
    .ReactCrop .ord-w {
      margin-top: -9px;
      margin-left: -9px;
    }
    .ReactCrop__drag-bar.ord-n {
      height: 14px;
      margin-top: -12px;
    }
    .ReactCrop__drag-bar.ord-e {
      width: 14px;
      margin-right: -12px;
    }
    .ReactCrop__drag-bar.ord-s {
      height: 14px;
      margin-bottom: -12px;
    }
    .ReactCrop__drag-bar.ord-w {
      width: 14px;
      margin-left: -12px;
    }
  }
`;

const StyledDropzoneContainer = styled.div`
  display: flex;

  .activeDropzone {
    #StyledDropzoneBackground {
      border-color: ${props => props.theme.colors.blue};
      background: rgba(68, 138, 255, 0.025);
    }
  }
`;

const StyledDropzone = styled(Dropzone)`
  position: relative;
  text-align: center;
  cursor: pointer;
  transition: all 0.25s cubic-bezier(0.23, 1, 0.32, 1);
  width: 100%;
  height: 380px;
`;

const StyledDropzoneBackground = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  cursor: pointer;
  border-radius: 6px;
  height: 100%;

  margin: 2rem;
  height: calc(100% - 4rem);
  border: 2px dashed transparent;
  transition: all 220ms ease;
`;

const StyledDropzoneBackgroundText = styled.p`
  font-size: 1.8rem;
  margin-bottom: 2rem;
`;

const StyledDropzoneButton = styled(Button)`
  margin-top: 20px;
  min-width: 15rem;
  height: 5rem;
  font-size: 1.6rem;
`;

const StyledReactCrop = styled(ReactCrop)`
  max-width: 1000px;
  width: 100%;
  margin: 0 auto;
  height: 401px;
`;

const ButtonContainer = styled.div`
  display: flex;
  padding: 2.2rem;
  border-top: 1px solid #e8e8e8;
`;

const ButtonSpacer = styled.div`
  margin-right: 2rem;
`;

const UploadingAnimation = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  text-align: center;
  height: 336px;

  .AuthLoader__animation {
    margin-top: 0.05rem;
  }
`;

class FileUploadCrop extends Component {
  state = {
    files: undefined,
    crop: undefined,
    pixelCrop: undefined,
  };

  componentDidUpdate(prevProps) {
    if (prevProps.isUploading === true && this.props.isUploading === false) {
      this.props.dispatch(hideModal());
    }
  }

  onDrop = (files, rejectedFiles) => {
    this.setState({ files });
  };

  onChange = (crop, pixelCrop) => {
    this.setState({ crop, pixelCrop });
  };

  onImageLoaded = image => {
    const widthLongerThanHeight = image.width > image.height;

    /**
     * crop is the definition of the cropped section. It defines where it is
     * located and how long each side is. Depending on which side of the image
     * is shorter we base the cropped area around that.
     */
    const crop = widthLongerThanHeight
      ? {
          height: 75,
          y: 12.5,
          x: (1 - image.height * 0.75 / image.width) / 2 * 100,
          aspect: 1,
        }
      : {
          width: 75,
          y: (1 - image.width * 0.75 / image.height) / 2 * 100,
          x: 12.5,
          aspect: 1,
        };

    /**
     * sideLength is the same for both sides of the cropped area since
     * we are restricting the aspect to be 1. Whichever side of the image
     * is shorter we will create the width depending on that.
     */
    const sideLength = Math.round(
      widthLongerThanHeight
        ? crop.height / 100 * image.naturalHeight
        : crop.width / 100 * image.naturalWidth,
    );

    /**
     * pixelCrop is what we use to define the pixels that get cropped from the
     * original image. It's a subsection of the original image.
     */
    const pixelCrop = {
      x: Math.round((image.naturalWidth - sideLength) / 2),
      y: Math.round((image.naturalHeight - sideLength) / 2),
      width: sideLength,
      height: sideLength,
    };

    this.setState({
      crop: makeAspectCrop(crop, image.naturalWidth / image.naturalHeight),
      pixelCrop,
    });
  };

  getCroppedImg = (image, pixelCrop, fileName) => {
    const canvas = document.createElement('canvas');
    canvas.width = pixelCrop.width;
    canvas.height = pixelCrop.height;
    const ctx = canvas.getContext('2d');

    ctx.drawImage(
      image,
      pixelCrop.x,
      pixelCrop.y,
      pixelCrop.width,
      pixelCrop.height,
      0,
      0,
      pixelCrop.width,
      pixelCrop.height,
    );

    // As a blob
    return new Promise(resolve => {
      canvas.toBlob(file => {
        file.name = fileName;
        resolve(file);
      }, 'image/jpeg');
    });
  };

  handleUpload = async (image, pixelCrop, returnedFileName) => {
    const { dispatch, user } = this.props;
    const myImage = new Image();
    const myImageUrl = URL.createObjectURL(image);
    myImage.src = myImageUrl;

    myImage.onload = async () => {
      const croppedImg = await this.getCroppedImg(
        myImage,
        pixelCrop,
        returnedFileName,
      );

      const file = new File([croppedImg], returnedFileName, {
        type: croppedImg.type,
        lastModified: Date.now(),
      });

      const myImageCroppedUrl = URL.createObjectURL(croppedImg);

      this.dispatchCroppedFileToUpload(
        file,
        'profile_pic',
        user.id,
        dispatch,
        myImageCroppedUrl,
      );
    };
  };

  dispatchCroppedFileToUpload = (
    file,
    documentType,
    userId,
    dispatch,
    preview,
  ) => {
    this.readAsDataURL(file, event => {
      // eslint-disable-line no-loop-func

      const reqBodyAsString =
        `?userKey=${userId}` +
        `&documentType=${documentType}` +
        `&fileName=${file.name}` +
        `\n${event.target.result}`;

      const fileForUser = {
        documentType,
        name: file.name,
        preview,
        size: file.size,
        type: file.type,
        fieldName: 'profile_pic',
      };

      dispatch(uploadFile(reqBodyAsString, fileForUser)).then(response =>
        this.handleCompleteUpload(response, preview),
      );
    });
  };

  /**
   * We want to pass the file upload preview blob into redux on success so we
   * don't have to make a network request on the complete profile picture upload
   */
  handleCompleteUpload = (response, preview) => {
    const { dispatch, user } = this.props;
    if (response && !response.errors[0]) {
      dispatch({
        type: UPLOAD_PROFILE_PICTURE_FILE_SUCCESS,
        payload: {
          preview,
          user,
        },
      });
      dispatch({
        type: DELETE_FROM_LIST,
        payload: { fieldName: 'profile_pic' },
      });
    }
  };

  readAsDataURL = (file, onload) => {
    if (!file) {
      return false;
    }
    const reader = new FileReader();

    reader.onload = event => onload(event);
    reader.readAsDataURL(file);
  };

  render() {
    const { isUploading } = this.props;

    return (
      <FileUploadContainer>
        {this.state.files ? (
          <div
            style={{
              display: 'flex',
              alignItems: 'flex-start',
              justifyContent: 'center',
              padding: '2.2rem',
            }}
          >
            {isUploading ? (
              <UploadingAnimation>
                <div>
                  <p>Uploading...</p>
                </div>
                <AuthLoaderAnimation />
              </UploadingAnimation>
            ) : (
              <StyledReactCrop
                src={this.state.files[0].preview}
                crop={this.state.crop}
                onChange={this.onChange}
                onImageLoaded={this.onImageLoaded}
              />
            )}
          </div>
        ) : (
          <StyledDropzoneContainer>
            <StyledDropzone
              onDrop={this.onDrop}
              activeClassName="activeDropzone"
            >
              <StyledDropzoneBackground id="StyledDropzoneBackground">
                <StyledDropzoneBackgroundText>
                  Drag a file here or select file
                </StyledDropzoneBackgroundText>
                <StyledDropzoneButton
                  size="xlarge"
                  appearance="primary"
                  text="Upload Photo"
                />
              </StyledDropzoneBackground>
            </StyledDropzone>
          </StyledDropzoneContainer>
        )}
        <ButtonContainer>
          <ButtonSpacer>
            <Button
              onClick={() =>
                this.handleUpload(
                  this.state.files[0],
                  this.state.pixelCrop,
                  'yolo',
                )
              }
              disabled={isUploading || !this.state.files}
              size="large"
              text="Set as profile photo"
            />
          </ButtonSpacer>
          <Button
            onClick={() => this.setState({ files: undefined, crop: undefined })}
            disabled={isUploading || !this.state.files}
            text="reset"
            size="large"
            appearance="secondary"
          />
        </ButtonContainer>
      </FileUploadContainer>
    );
  }
}

const mapStateToProps = state => ({
  user: state.user,
  isUploading: state.files.isUploading,
});

export default connect(mapStateToProps)(FileUploadCrop);
