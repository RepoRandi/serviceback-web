import React, { useState, useCallback, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useDrawerDispatch } from 'context/DrawerContext';
import { Scrollbars } from 'react-custom-scrollbars';
import Uploader from 'components/Uploader/Uploader';
import Input from 'components/Input/Input';
import Button, { KIND } from 'components/Button/Button';
import Select from 'components/Select/FormSelect';
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
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { EditorState, convertToRaw } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import { useServiceCreate } from 'services/service';
import {
  SERVICE_STATUS_OPTIONS,
  WYSIWYG_TOOLBAR_OPTIONS,
} from 'config/constants';
import { useServiceCategoryList } from 'services/service-category';
import { Textarea } from 'components/Textarea/Textarea';

type Props = any;

const ServiceCreateForm: React.FC<Props> = props => {
  const dispatch = useDrawerDispatch();
  const closeDrawer = useCallback(() => dispatch({ type: 'CLOSE_DRAWER' }), [
    dispatch,
  ]);
  const { register, handleSubmit, setValue } = useForm();

  const [status, setStatus] = useState([SERVICE_STATUS_OPTIONS[0]]);
  const [selectedCategoryOption, setSelectedCategoryOption] = useState([]);
  const [categoryOptions, setCategoryOptions] = useState([]);

  const [mutate] = useServiceCreate();
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const [description, setDescription] = useState('');

  const storageRef = firebase.storage().ref();

  React.useEffect(() => {
    register({ name: 'imageUrl' });
  }, [register]);

  // Populate category options

  const { data } = useServiceCategoryList();
  useEffect(() => {
    if (data) {
      const options = data.data.map(cat => {
        return {
          label: cat.name,
          value: cat.id,
        };
      });
      setCategoryOptions(options);
    }
  }, [data]);

  const onSubmit = async ({
    name,
    price,
    cashbackPercent,
    durationMinutes,
    quantityUnit,
    imageUrl,
    slug,
  }) => {
    const additionalDetails = draftToHtml(
      convertToRaw(editorState.getCurrentContent()),
    );
    const serviceCategory = {
      id: selectedCategoryOption[0].value,
    };
    const newService = {
      name: name,
      description,
      additionalDetails,
      price,
      cashbackPercent,
      durationMinutes,
      quantityUnit,
      status: status[0].value,
      serviceCategory,
      imageUrl: imageUrl || '',
      slug,
    };
    try {
      await mutate(newService);
    } catch (error) {
      console.log('err', error);
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

  const handleDescriptionChange = value => {
    setValue('description', value);
    setDescription(value);
  };

  const handleAdditionalDetailsChange = (newEditorState: EditorState) => {
    setEditorState(newEditorState);
  };

  const handleCategoryChange = ({ value }) => {
    setSelectedCategoryOption(value);
  };

  return (
    <>
      <DrawerTitleWrapper>
        <DrawerTitle>Add Service</DrawerTitle>
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
              <FieldDetails>Upload your Service image here</FieldDetails>
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
              <FieldDetails>Service Details</FieldDetails>
            </Col>

            <Col lg={8}>
              <DrawerBox>
                <FormFields>
                  <FormLabel>Service Name</FormLabel>
                  <Input inputRef={register({ required: true })} name="name" />
                </FormFields>
                <FormFields>
                  <FormLabel>Slug</FormLabel>
                  <Input inputRef={register({ required: true })} name="slug" />
                </FormFields>
                <FormFields>
                  <FormLabel>Category</FormLabel>
                  <Select
                    options={categoryOptions}
                    value={selectedCategoryOption}
                    onChange={handleCategoryChange}
                  />
                </FormFields>
                <FormFields>
                  <FormLabel>Description</FormLabel>
                  <Textarea
                    value={description}
                    onChange={e => {
                      handleDescriptionChange(e.target.value);
                    }}
                  />
                </FormFields>
                <FormFields>
                  <FormLabel>Additional Details</FormLabel>
                  <Editor
                    editorState={editorState}
                    toolbar={WYSIWYG_TOOLBAR_OPTIONS}
                    onEditorStateChange={handleAdditionalDetailsChange}
                  />
                </FormFields>
                <FormFields>
                  <FormLabel>Price($)</FormLabel>
                  <Input type="number" inputRef={register} name="price" />
                </FormFields>
                <FormFields>
                  <FormLabel>Cashback(%)</FormLabel>
                  <Input
                    type="number"
                    inputRef={register}
                    name="cashbackPercent"
                  />
                </FormFields>
                <FormFields>
                  <FormLabel>Duration(minutes)</FormLabel>
                  <Input
                    type="number"
                    inputRef={register}
                    name="durationMinutes"
                  />
                </FormFields>
                <FormFields>
                  <FormLabel>Quantity Unit</FormLabel>
                  <Input
                    inputRef={register({ required: true })}
                    name="quantityUnit"
                  />
                </FormFields>
                <FormFields>
                  <FormLabel>Status</FormLabel>
                  <Select
                    options={SERVICE_STATUS_OPTIONS}
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
            Create Service
          </Button>
        </ButtonGroup>
      </Form>
    </>
  );
};

export default ServiceCreateForm;
