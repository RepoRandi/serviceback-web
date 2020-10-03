import React, { useCallback, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDrawerDispatch, useDrawerState } from 'context/DrawerContext';
import { Scrollbars } from 'react-custom-scrollbars';
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
import { FormFields, FormLabel } from 'components/FormFields/FormFields';
import { useReviewUpdate } from 'services/review';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { EditorState, convertToRaw, ContentState } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
import { WYSIWYG_TOOLBAR_OPTIONS } from 'config/constants';

type Props = any;

const ReviewUpdateForm: React.FC<Props> = props => {
  const dispatch = useDrawerDispatch();
  const data = useDrawerState('data');
  const closeDrawer = useCallback(() => dispatch({ type: 'CLOSE_DRAWER' }), [
    dispatch,
  ]);
  const { register, handleSubmit } = useForm({
    defaultValues: data,
  });

  const contentBlock = htmlToDraft(data.description);
  const contentState = ContentState.createFromBlockArray(
    contentBlock.contentBlocks,
  );

  const [editorState, setEditorState] = useState(
    EditorState.createWithContent(contentState),
  );

  React.useEffect(() => {
    register({ name: 'imageUrl' });
  }, [register]);

  const [mutate] = useReviewUpdate();

  const onSubmit = async ({ name, imageUrl }) => {
    const description = draftToHtml(
      convertToRaw(editorState.getCurrentContent()),
    );
    const newReview = {
      id: data.id,
      content: description,
    };
    try {
      await mutate(newReview);
    } catch (error) {
      console.error('err', error);
    }
    closeDrawer();
  };

  const handleDescriptionChange = (newEditorState: EditorState) => {
    setEditorState(newEditorState);
  };

  return (
    <>
      <DrawerTitleWrapper>
        <DrawerTitle>Update Review</DrawerTitle>
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
              <FieldDetails>Review Details</FieldDetails>
            </Col>

            <Col lg={8}>
              <DrawerBox>
                <FormFields>
                  <FormLabel>Content</FormLabel>
                  <Editor
                    editorState={editorState}
                    toolbar={WYSIWYG_TOOLBAR_OPTIONS}
                    onEditorStateChange={handleDescriptionChange}
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
            Update Review
          </Button>
        </ButtonGroup>
      </Form>
    </>
  );
};

export default ReviewUpdateForm;
