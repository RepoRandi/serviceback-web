---
to: admin/src/containers/<%= h.changeCase.pascal(name) %>/<%= h.changeCase.pascal(name) %>UpdateForm.tsx
---
import React, { useCallback, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDrawerDispatch, useDrawerState } from 'context/DrawerContext';
import { Scrollbars } from 'react-custom-scrollbars';
import Uploader from 'components/Uploader/Uploader';
import Input from 'components/Input/Input';
import Button, { KIND } from 'components/Button/Button';
import DrawerBox from 'components/DrawerBox/DrawerBox';
import { Row, Col } from 'components/FlexBox/FlexBox';
import {
  Form,
  DrawerTitleWrapper,
  DrawerTitle,
  FieldDetails,
  ButtonGroup,
} from '../DrawerItems/DrawerItems.style';
import firebase from 'firebase';
import { FormFields, FormLabel } from 'components/FormFields/FormFields';
import { use<%= h.changeCase.pascal(name) %>Update } from 'services/<%= h.changeCase.param(name) %>';
import Select from 'components/Select/FormSelect';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { EditorState, convertToRaw, ContentState } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
import {
  <%= h.changeCase.constant(name) %>_STATUS_OPTIONS,
  WYSIWYG_TOOLBAR_OPTIONS,
} from 'config/constants';

type Props = any;

const <%= h.changeCase.pascal(name) %>UpdateForm: React.FC<Props> = props => {
  const dispatch = useDrawerDispatch();
  const data = useDrawerState('data');
  const closeDrawer = useCallback(() => dispatch({ type: 'CLOSE_DRAWER' }), [
    dispatch,
  ]);
  const { register, handleSubmit, setValue } = useForm({
    defaultValues: data,
  });
  const currentStatus = <%= h.changeCase.constant(name) %>_STATUS_OPTIONS.filter(status => {
    return status.value === data.status;
  });
  const [status, setStatus] = useState(currentStatus);

  const contentBlock = htmlToDraft(data.description);
  const contentState = ContentState.createFromBlockArray(
    contentBlock.contentBlocks,
  );

  const [editorState, setEditorState] = useState(
    EditorState.createWithContent(contentState),
  );

  const storageRef = firebase.storage().ref();

  React.useEffect(() => {
    register({ name: 'imageUrl' });
  }, [register]);

  const [mutate] = use<%= h.changeCase.pascal(name) %>Update();

  const onSubmit = async ({ name, imageUrl }) => {
    const description = draftToHtml(
      convertToRaw(editorState.getCurrentContent()),
    );
    const new<%= h.changeCase.pascal(name) %> = {
      id: data.id,
      name: name,
      description,
      imageUrl: imageUrl || '',
      status: status[0].value,
    };
    try {
      await mutate(new<%= h.changeCase.pascal(name) %>);
    } catch (error) {
      console.error('err', error);
    }
    closeDrawer();
  };

  const handleUploader = async files => {
    const imageRef = storageRef.child(`images/${files[0].name}`);

    await imageRef.put(files[0]);
    const imageUrl = await imageRef.getDownloadURL();
    setValue('imageUrl', imageUrl);
  };

  const handleStatusChange = ({ value }) => {
    setValue('status', value[0].value);
    setStatus(value);
  };

  const handleDescriptionChange = (newEditorState: EditorState) => {
    setEditorState(newEditorState);
  };

  return (
    <>
      <DrawerTitleWrapper>
        <DrawerTitle>Update <%= h.changeCase.pascal(name) %></DrawerTitle>
      </DrawerTitleWrapper>

      <Form onSubmit={handleSubmit(onSubmit)} style={{ height: '100%' }}>
        <Scrollbars
          autoHide
          renderView={props => (
            <div {...props} style={{ ...props.style, overflowX: 'hidden' }} />
          )}
          renderTrackHorizontal={props => (
            <div
              {...props}
              style={{ display: 'none' }}
              className="track-horizontal"
            />
          )}
        >
          <Row>
            <Col lg={4}>
              <FieldDetails>Current Image</FieldDetails>
            </Col>
            <Col lg={8}>
              <DrawerBox
                overrides={{
                  Block: {
                    style: {
                      width: '100%',
                      height: 'auto',
                      padding: '30px',
                      borderRadius: '3px',
                      backgroundColor: '#ffffff',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    },
                  },
                }}
              >
                <img src={data.imageUrl} width="100%" />
              </DrawerBox>
            </Col>
          </Row>
          <Row>
            <Col lg={4}>
              <FieldDetails>Upload your <%= h.changeCase.pascal(name) %> image here</FieldDetails>
            </Col>
            <Col lg={8}>
              <DrawerBox
                overrides={{
                  Block: {
                    style: {
                      width: '100%',
                      height: 'auto',
                      padding: '30px',
                      borderRadius: '3px',
                      backgroundColor: '#ffffff',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    },
                  },
                }}
              >
                <Uploader onChange={handleUploader} />
              </DrawerBox>
            </Col>
          </Row>

          <Row>
            <Col lg={4}>
              <FieldDetails><%= h.changeCase.pascal(name) %> Details</FieldDetails>
            </Col>

            <Col lg={8}>
              <DrawerBox>
                <FormFields>
                  <FormLabel><%= h.changeCase.pascal(name) %> Name</FormLabel>
                  <Input inputRef={register({ required: true })} name="name" />
                </FormFields>
                <FormFields>
                  <FormLabel>Description</FormLabel>
                  <Editor
                    editorState={editorState}
                    toolbar={WYSIWYG_TOOLBAR_OPTIONS}
                    onEditorStateChange={handleDescriptionChange}
                  />
                </FormFields>

                <FormFields>
                  <FormLabel>Status</FormLabel>
                  <Select
                    options={<%= h.changeCase.constant(name) %>_STATUS_OPTIONS}
                    value={status}
                    onChange={handleStatusChange}
                  />
                </FormFields>
              </DrawerBox>
            </Col>
          </Row>
        </Scrollbars>

        <ButtonGroup>
          <Button
            kind={KIND.minimal}
            onClick={closeDrawer}
            overrides={{
              BaseButton: {
                style: ({ $theme }) => ({
                  width: '50%',
                  borderTopLeftRadius: '3px',
                  borderTopRightRadius: '3px',
                  borderBottomRightRadius: '3px',
                  borderBottomLeftRadius: '3px',
                  marginRight: '15px',
                  color: $theme.colors.red400,
                }),
              },
            }}
          >
            Cancel
          </Button>

          <Button
            type="submit"
            overrides={{
              BaseButton: {
                style: ({ $theme }) => ({
                  width: '50%',
                  borderTopLeftRadius: '3px',
                  borderTopRightRadius: '3px',
                  borderBottomRightRadius: '3px',
                  borderBottomLeftRadius: '3px',
                }),
              },
            }}
          >
            Update <%= h.changeCase.pascal(name) %>
          </Button>
        </ButtonGroup>
      </Form>
    </>
  );
};

export default <%= h.changeCase.pascal(name) %>UpdateForm;
