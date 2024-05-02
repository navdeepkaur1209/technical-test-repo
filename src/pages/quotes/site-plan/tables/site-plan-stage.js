import { useState, useEffect, useRef, Fragment } from 'react';
import PropTypes from 'prop-types';
import { Grid, Button, ImageList, ImageListItem, CardContent } from '@mui/material';
import MainCard from 'components/MainCard';
import { Stage, Layer, Image, Text, Transformer } from 'react-konva';
import useImage from 'use-image';
import sitePlanData from './site-plan-data';
import { useDispatch } from 'store';
import { openSnackbar } from 'store/reducers/snackbar';
const dashImage = require.context('assets/images/pages/quotes/site-plan', true);

// GraphQL.
import useGraphQLMutation from 'hooks/useGraphQLMutation';
import useGraphQLQuery from 'hooks/useGraphQLQuery';
import useGraphQLLazyQuery from 'hooks/useGraphQLLazyQuery';
import GetQuoteDetails from 'graphql/quotes/GetQuoteDetails';
import UpdateQuoteDetails from 'graphql/quotes/UpdateQuoteDetails';
import GetQuotePdfLink from 'graphql/quotes/GetQuotePdfLink';

/* Component */
const SitePlanStage = ({ quoteId }) => {
  const dispatch = useDispatch();
  const rightColumn = useRef(null);
  const leftColumn = useRef(null);
  const leftColumnWidth = useRef(null);
  const leftColumnHeight = useRef(null);
  const draggedElement = useRef(null);
  const draggedElementClone = useRef(null);
  const draggedImages = useRef({});
  const [shapes, setShapes] = useState([]);
  const canvasId = useRef();
  const mainCardDragDropRef = useRef();
  const stageRef = useRef();
  const [selectedId, selectShape] = useState(null);
  const [stageSize, setStageSize] = useState({});

  useEffect(() => {
    const handleResize = () => {
      setStageSize({ width: leftColumn.current.offsetWidth, height: leftColumn.current.offsetHeight });
    };

    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  /* GraphQL: GetQuoteDetails */
  const { data: dataGetQuoteDetails } = useGraphQLQuery(GetQuoteDetails, {
    variables: { id: quoteId, type: 'SITEPLAN', subtype: 'SITEPLAN' }
  });

  useEffect(() => {
    if (leftColumn.current) {
      leftColumnWidth.current = leftColumn.current.offsetWidth;
      leftColumnHeight.current = leftColumn.current.offsetHeight;
    }
    if (dataGetQuoteDetails && dataGetQuoteDetails.GetQuoteDetails && dataGetQuoteDetails.GetQuoteDetails.QuoteDetails.length > 0) {
      const shapes = JSON.parse(dataGetQuoteDetails.GetQuoteDetails.QuoteDetails) || [];
      shapes.length > 0 ? setShapes(shapes[1]) : setShapes([]);
    }
  }, [dataGetQuoteDetails]);

  /* GraphQL: UpdateQuoteDetails */
  const [mutationUpdateQuoteDetails, { data: resultUpdateQuoteDetails }] = useGraphQLMutation(UpdateQuoteDetails);

  const doMutation = (values) => {
    console.log(values);
    mutationUpdateQuoteDetails({
      variables: {
        id: quoteId,
        type: 'SITEPLAN',
        subtype: 'SITEPLAN',
        details: JSON.stringify(values)
      }
    });
  };

  useEffect(() => {
    if (resultUpdateQuoteDetails && resultUpdateQuoteDetails.UpdateQuoteDetails.Status === 'SUCCESS') {
      dispatch(
        openSnackbar({
          open: true,
          message: resultUpdateQuoteDetails.UpdateQuoteDetails.Message,
          variant: 'alert',
          alert: {
            color: 'success'
          },
          close: false
        })
      );
    }
  }, [resultUpdateQuoteDetails, dispatch]);

  const Shape = ({ isSelected, onSelect, onChange, shape }) => {
    const shapeRef = useRef();
    const trRef = useRef();
    const [img] = useImage(shape.src);
    useEffect(() => {
      if (isSelected) {
        // we need to attach transformer manually
        trRef.current.nodes([shapeRef.current]);
        trRef.current.getLayer().batchDraw();
      }
    }, [isSelected]);

    return (
      <Fragment>
        {shape.type === 'img' && (
          <Image
            onClick={onSelect}
            onTap={onSelect}
            ref={shapeRef}
            image={img}
            {...shape.attrs}
            draggable
            dragBoundFunc={(pos) => {
              if (pos.x < 0) {
                pos.x = 0;
              } else if (pos.x > stageRef.current.width() - shapeRef.current.width()) {
                pos.x = stageRef.current.width() - shapeRef.current.width();
              }
              if (pos.y < 0) {
                pos.y = 0;
              } else if (pos.y > stageRef.current.height() - shapeRef.current.height()) {
                pos.y = stageRef.current.height() - shapeRef.current.height();
              }
              return pos;
            }}
            onDragEnd={(e) => {
              onChange({
                ...shape.attrs,
                x: e.target.x(),
                y: e.target.y()
              });
            }}
            onTransformEnd={() => {
              const node = shapeRef.current;
              const scaleX = node.scaleX();
              const scaleY = node.scaleY();
              const rotation = node.rotation();
              node.scaleX(1);
              node.scaleY(1);
              onChange({
                ...shape.attrs,
                x: node.x(),
                y: node.y(),
                scaleX: scaleX,
                scaleY: scaleY,
                rotation: rotation
              });
            }}
          />
        )}
        {shape.type === 'text' && (
          <Text
            onClick={onSelect}
            onTap={onSelect}
            ref={shapeRef}
            {...shape.attrs}
            align={'center'}
            verticalAlign={'middle'}
            draggable
            dragBoundFunc={(pos) => {
              if (pos.x < 0) {
                pos.x = 0;
              } else if (pos.x > stageRef.current.width() - shapeRef.current.width()) {
                pos.x = stageRef.current.width() - shapeRef.current.width();
              }
              if (pos.y < 0) {
                pos.y = 0;
              } else if (pos.y > stageRef.current.height() - shapeRef.current.height()) {
                pos.y = stageRef.current.height() - shapeRef.current.height();
              }
              return pos;
            }}
            onDragEnd={(e) => {
              onChange({
                ...shape.attrs,
                x: e.target.x(),
                y: e.target.y()
              });
            }}
            onTransformEnd={() => {
              const node = shapeRef.current;
              const scaleX = node.scaleX();
              const scaleY = node.scaleY();
              const rotation = node.rotation();
              node.scaleX(1);
              node.scaleY(1);
              onChange({
                ...shape.attrs,
                x: node.x(),
                y: node.y(),
                scaleX: scaleX,
                scaleY: scaleY,
                rotation: rotation
              });
            }}
            onDblClick={() => {
              // hide text node and transformer:
              const textNode = shapeRef.current;
              const tr = trRef.current;
              const stage = stageRef.current;
              textNode.hide();
              tr.hide();

              // create textarea over canvas with absolute position
              // first we need to find position for textarea
              // how to find it?

              // at first lets find position of text node relative to the stage:
              const textPosition = textNode.absolutePosition();

              // so position of textarea will be the sum of positions above:
              const areaPosition = {
                x: stage.container().offsetLeft + textPosition.x,
                y: stage.container().offsetTop + textPosition.y
              };

              // create textarea and style it
              const textarea = document.createElement('textarea');
              leftColumn.current.appendChild(textarea);

              // apply many styles to match text on canvas as close as possible
              // remember that text rendering on canvas and on the textarea can be different
              // and sometimes it is hard to make it 100% the same. But we will try...
              textarea.value = textNode.text();
              textarea.style.position = 'absolute';
              textarea.style.top = areaPosition.y + 'px';
              textarea.style.left = areaPosition.x + 'px';
              textarea.style.width = textNode.width() - textNode.padding() * 2 + 'px';
              textarea.style.height = textNode.height() - textNode.padding() * 2 + 5 + 'px';
              textarea.style.fontSize = textNode.fontSize() + 'px';
              textarea.style.border = 'none';
              textarea.style.padding = '0px';
              textarea.style.margin = '0px';
              textarea.style.overflow = 'hidden';
              textarea.style.background = 'none';
              textarea.style.outline = 'none';
              textarea.style.resize = 'none';
              textarea.style.lineHeight = textNode.lineHeight();
              textarea.style.fontFamily = textNode.fontFamily();
              textarea.style.transformOrigin = 'left top';
              textarea.style.textAlign = textNode.align();
              textarea.style.color = textNode.fill();
              const rotation = textNode.rotation();
              let transform = '';
              if (rotation) {
                transform += 'rotateZ(' + rotation + 'deg)';
              }

              let px = 0;
              // also we need to slightly move textarea on firefox
              // because it jumps a bit
              const isFirefox = navigator.userAgent.toLowerCase().indexOf('firefox') > -1;
              if (isFirefox) {
                px += 2 + Math.round(textNode.fontSize() / 20);
              }
              transform += 'translateY(-' + px + 'px)';

              textarea.style.transform = transform;

              // reset height
              textarea.style.height = 'auto';
              // after browsers resized it we can set actual value
              textarea.style.height = textarea.scrollHeight + 3 + 'px';

              textarea.focus();

              function removeTextarea() {
                textarea.parentNode.removeChild(textarea);
                window.removeEventListener('click', handleOutsideClick);
                textNode.show();
                // tr.show();
                // tr.forceUpdate();
              }

              function setTextareaWidth(newWidth) {
                if (!newWidth) {
                  // set width for placeholder
                  newWidth = textNode.placeholder.length * textNode.fontSize();
                }
                // some extra fixes on different browsers
                const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
                const isFirefox = navigator.userAgent.toLowerCase().indexOf('firefox') > -1;
                if (isSafari || isFirefox) {
                  newWidth = Math.ceil(newWidth);
                }

                const isEdge = document.documentMode || /Edge/.test(navigator.userAgent);
                if (isEdge) {
                  newWidth += 1;
                }
                textarea.style.width = newWidth + 'px';
              }

              textarea.addEventListener('keydown', function (e) {
                // hide on enter
                // but don't hide on shift + enter
                if (e.keyCode === 13 && !e.shiftKey) {
                  if (!textarea.value.trim()) {
                    deleteItem();
                  } else {
                    onChange({
                      ...shape.attrs,
                      text: textarea.value,
                      width: 'auto',
                      height: 'auto'
                    });
                  }
                  removeTextarea();
                }
                // on esc do not set value back to node
                if (e.keyCode === 27) {
                  removeTextarea();
                }
              });

              textarea.addEventListener('keydown', function () {
                const scale = textNode.getAbsoluteScale().x;
                setTextareaWidth(textNode.width() * scale);
                textarea.style.height = 'auto';
                textarea.style.height = textarea.scrollHeight + textNode.fontSize() + 'px';
              });

              function handleOutsideClick(e) {
                if (e.target !== textarea) {
                  if (!textarea.value.trim()) {
                    deleteItem();
                  } else {
                    onChange({
                      ...shape.attrs,
                      text: textarea.value,
                      width: 'auto',
                      height: 'auto'
                    });
                  }
                  removeTextarea();
                }
              }
              setTimeout(() => {
                window.addEventListener('click', handleOutsideClick);
              });
            }}
            onDblTap={() => {
              // hide text node and transformer:
              const textNode = shapeRef.current;
              const tr = trRef.current;
              const stage = stageRef.current;
              textNode.hide();
              tr.hide();

              // create textarea over canvas with absolute position
              // first we need to find position for textarea
              // how to find it?

              // at first lets find position of text node relative to the stage:
              const textPosition = textNode.absolutePosition();

              // so position of textarea will be the sum of positions above:
              const areaPosition = {
                x: stage.container().offsetLeft + textPosition.x,
                y: stage.container().offsetTop + textPosition.y
              };

              // create textarea and style it
              const textarea = document.createElement('textarea');
              leftColumn.current.appendChild(textarea);

              // apply many styles to match text on canvas as close as possible
              // remember that text rendering on canvas and on the textarea can be different
              // and sometimes it is hard to make it 100% the same. But we will try...
              textarea.value = textNode.text();
              textarea.style.position = 'absolute';
              textarea.style.top = areaPosition.y + 'px';
              textarea.style.left = areaPosition.x + 'px';
              textarea.style.width = textNode.width() - textNode.padding() * 2 + 'px';
              textarea.style.height = textNode.height() - textNode.padding() * 2 + 5 + 'px';
              textarea.style.fontSize = textNode.fontSize() + 'px';
              textarea.style.border = 'none';
              textarea.style.padding = '0px';
              textarea.style.margin = '0px';
              textarea.style.overflow = 'hidden';
              textarea.style.background = 'none';
              textarea.style.outline = 'none';
              textarea.style.resize = 'none';
              textarea.style.lineHeight = textNode.lineHeight();
              textarea.style.fontFamily = textNode.fontFamily();
              textarea.style.transformOrigin = 'left top';
              textarea.style.textAlign = textNode.align();
              textarea.style.color = textNode.fill();
              const rotation = textNode.rotation();
              let transform = '';
              if (rotation) {
                transform += 'rotateZ(' + rotation + 'deg)';
              }

              let px = 0;
              // also we need to slightly move textarea on firefox
              // because it jumps a bit
              const isFirefox = navigator.userAgent.toLowerCase().indexOf('firefox') > -1;
              if (isFirefox) {
                px += 2 + Math.round(textNode.fontSize() / 20);
              }
              transform += 'translateY(-' + px + 'px)';

              textarea.style.transform = transform;

              // reset height
              textarea.style.height = 'auto';
              // after browsers resized it we can set actual value
              textarea.style.height = textarea.scrollHeight + 3 + 'px';

              textarea.focus();

              function removeTextarea() {
                textarea.parentNode.removeChild(textarea);
                window.removeEventListener('click', handleOutsideClick);
                textNode.show();
                // tr.show();
                // tr.forceUpdate();
              }

              function setTextareaWidth(newWidth) {
                if (!newWidth) {
                  // set width for placeholder
                  newWidth = textNode.placeholder.length * textNode.fontSize();
                }
                // some extra fixes on different browsers
                const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
                const isFirefox = navigator.userAgent.toLowerCase().indexOf('firefox') > -1;
                if (isSafari || isFirefox) {
                  newWidth = Math.ceil(newWidth);
                }

                const isEdge = document.documentMode || /Edge/.test(navigator.userAgent);
                if (isEdge) {
                  newWidth += 1;
                }
                textarea.style.width = newWidth + 'px';
              }

              textarea.addEventListener('keydown', function (e) {
                // hide on enter
                // but don't hide on shift + enter
                if (e.keyCode === 13 && !e.shiftKey) {
                  if (!textarea.value.trim()) {
                    deleteItem();
                  } else {
                    onChange({
                      ...shape.attrs,
                      text: textarea.value,
                      width: 'auto',
                      height: 'auto'
                    });
                  }
                  removeTextarea();
                }
                // on esc do not set value back to node
                if (e.keyCode === 27) {
                  removeTextarea();
                }
              });

              textarea.addEventListener('keydown', function () {
                const scale = textNode.getAbsoluteScale().x;
                setTextareaWidth(textNode.width() * scale);
                textarea.style.height = 'auto';
                textarea.style.height = textarea.scrollHeight + textNode.fontSize() + 'px';
              });

              function handleOutsideClick(e) {
                if (e.target !== textarea) {
                  if (!textarea.value.trim()) {
                    deleteItem();
                  } else {
                    onChange({
                      ...shape.attrs,
                      text: textarea.value,
                      width: 'auto',
                      height: 'auto'
                    });
                  }
                  removeTextarea();
                }
              }
              setTimeout(() => {
                window.addEventListener('click', handleOutsideClick);
              });
            }}
          />
        )}
        {isSelected && (
          <Transformer
            ref={trRef}
            flipEnabled={false}
            rotateAnchorOffset={30}
            anchorStyleFunc={(anchor) => {
              if (anchor.hasName('rotater')) {
                anchor.cornerRadius(16);
                anchor.height(16);
                anchor.offsetY(8);
                anchor.width(16);
                anchor.offsetX(8);
              }
            }}
          />
        )}
      </Fragment>
    );
  };

  Shape.propTypes = {
    isSelected: PropTypes.bool.isRequired,
    onSelect: PropTypes.func,
    onChange: PropTypes.func,
    shape: PropTypes.object
  };

  /* GraphQL: GetQuotePdfLink */
  const [doGetQuotePdfLink, { data: dataGetQuotePdfLink }] = useGraphQLLazyQuery(GetQuotePdfLink);

  useEffect(() => {
    if (dataGetQuotePdfLink && dataGetQuotePdfLink.GetQuotePdfLink) {
      if (dataGetQuotePdfLink.GetQuotePdfLink.Url) {
        window.open(dataGetQuotePdfLink.GetQuotePdfLink.Url, '_blank', 'noreferrer');
      }
    }
  }, [dataGetQuotePdfLink]);

  const downloadSitePlan = () => {
    doGetQuotePdfLink({
      variables: { id: quoteId, filetype: 'SitePlan' }
    });
  };

  /* Konva JS */
  const dropHandler = (event) => {
    event.preventDefault();
    const element = rightColumn.current.querySelector(`[data-id="${canvasId.current}"]`);
    draggedElement.current = element;
    if (draggedElement.current) {
      const rect = leftColumn.current.getBoundingClientRect();
      const mouseX = event.clientX - rect.left - draggedImages.current[canvasId.current].offsetX;
      const mouseY = event.clientY - rect.top - draggedImages.current[canvasId.current].offsetY;
      if (draggedElement.current.dataset.type === 'img') {
        setShapes(
          shapes.concat([
            {
              id: shapes.length + 1,
              type: draggedElement.current.dataset.type,
              src: draggedElement.current.src,
              attrs: {
                x: mouseX,
                y: mouseY,
                width: draggedElement.current.width,
                height: draggedElement.current.height
              }
            }
          ])
        );
        selectShape(shapes.length + 1);
      } else if (draggedElement.current.dataset.type === 'text') {
        console.log(draggedElement.current.fontSize);
        setShapes(
          shapes.concat([
            {
              id: shapes.length + 1,
              type: draggedElement.current.dataset.type,
              src: draggedElement.current.src,
              attrs: {
                x: mouseX,
                y: mouseY,
                // width: draggedElement.current.width,
                // height: draggedElement.current.height,
                text: draggedElement.current.dataset.content.replace(/\\n/g, '\n'),
                fontSize: parseInt(draggedElement.current.style.fontSize, 10),
                fontFamily: draggedElement.current.style.fontFamily,
                fill: draggedElement.current.style.color
              }
            }
          ])
        );
        selectShape(shapes.length + 1);
      }
    }
  };

  const allowDropHandler = (event) => {
    event.preventDefault(); // To allow dropping
  };

  const dragStartHandler = (event) => {
    canvasId.current = event.target.dataset.id;
    draggedImages.current[canvasId.current] = { offsetX: event.nativeEvent.offsetX, offsetY: event.nativeEvent.offsetY };
  };

  const touchStartHandler = (event) => {
    draggedElement.current = event.target;
    const initialX = draggedElement.current.offsetLeft;
    const initialY = draggedElement.current.offsetTop;
    draggedElementClone.current = draggedElement.current.cloneNode();
    draggedElementClone.current.style.display = 'block';
    draggedElementClone.current.style.position = 'fixed';
    draggedElementClone.current.width = draggedElement.current.offsetWidth;
    draggedElementClone.current.height = draggedElement.current.offsetHeight;
    if (draggedElement.current.dataset.type === 'text') {
      draggedElementClone.current.style.width = draggedElement.current.offsetWidth + 'px';
      draggedElementClone.current.style.height = draggedElement.current.offsetHeight + 'px';
      draggedElementClone.current.textContent = draggedElement.current.dataset.content;
    }
    draggedElementClone.current.style.opacity = 0.5;
    draggedElementClone.current.style.left = initialX + 'px';
    draggedElementClone.current.style.top = initialY + 'px';
    console.log(draggedElementClone.current);
    rightColumn.current.appendChild(draggedElementClone.current);
  };

  const touchMoveHandler = (event) => {
    const touch = event.touches[0];
    const posX = touch.clientX - draggedElement.current.offsetLeft - draggedElement.current.offsetWidth / 2;
    const posY = touch.clientY - draggedElement.current.offsetTop - draggedElement.current.offsetHeight / 2;
    draggedElementClone.current.style.transform = 'translate(' + posX + 'px, ' + posY + 'px)';
    canvasId.current = event.target.dataset.id;
    draggedImages.current[canvasId.current] = { offsetX: touch.pageX, offsetY: touch.pageY };
  };

  const touchEndHandler = () => {
    // event.preventDefault();
    const element = rightColumn.current.querySelector(`[data-id="${canvasId.current}"]`);
    draggedElement.current = element;
    if (draggedElement.current) {
      const mouseX =
        draggedImages.current[canvasId.current].offsetX -
        mainCardDragDropRef.current.offsetLeft -
        draggedElement.current.offsetWidth / 2 -
        44;
      const mouseY =
        draggedImages.current[canvasId.current].offsetY -
        mainCardDragDropRef.current.offsetTop -
        draggedElement.current.offsetWidth / 2 -
        140;
      if (draggedElement.current.dataset.type === 'img') {
        setShapes(
          shapes.concat([
            {
              id: shapes.length + 1,
              type: draggedElement.current.dataset.type,
              src: draggedElement.current.src,
              attrs: {
                x: mouseX,
                y: mouseY,
                width: draggedElementClone.current.width,
                height: draggedElementClone.current.height
              }
            }
          ])
        );
        selectShape(shapes.length + 1);
      } else if (draggedElement.current.dataset.type === 'text') {
        console.log(mouseX, mouseY);
        setShapes(
          shapes.concat([
            {
              id: shapes.length + 1,
              type: draggedElement.current.dataset.type,
              src: draggedElement.current.src,
              attrs: {
                x: mouseX,
                y: mouseY,
                // width: draggedElement.current.width,
                // height: draggedElement.current.height,
                text: draggedElement.current.dataset.content.replace(/\\n/g, '\n'),
                fontSize: parseInt(draggedElement.current.style.fontSize, 10),
                fontFamily: draggedElement.current.style.fontFamily,
                fill: draggedElement.current.style.color
              }
            }
          ])
        );
        selectShape(shapes.length + 1);
      }
    }
    rightColumn.current.removeChild(draggedElementClone.current);
  };

  const checkDeselect = (e) => {
    // deselect when clicked on empty area
    const clickedOnEmpty = e.target === e.target.getStage();
    if (clickedOnEmpty) {
      selectShape(null);
    }
  };

  const deleteItem = () => {
    if (selectedId) {
      const newShapes = [...shapes];
      const shapeSelect = newShapes.find((e) => e.id === selectedId);
      const index = newShapes.indexOf(shapeSelect);
      newShapes.splice(index, 1);
      setShapes(newShapes);
    }
  };

  const moveToBottom = () => {
    if (selectedId) {
      const newShapes = [...shapes];
      const shapeSelect = newShapes.find((e) => e.id === selectedId);
      const index = newShapes.indexOf(shapeSelect);
      newShapes.splice(index, 1);
      newShapes.unshift(shapeSelect);
      setShapes(newShapes);
    }
  };

  const moveToTop = () => {
    if (selectedId) {
      const newShapes = [...shapes];
      const shapeSelect = newShapes.find((e) => e.id === selectedId);
      const index = newShapes.indexOf(shapeSelect);
      newShapes.splice(index, 1);
      newShapes.push(shapeSelect);
      setShapes(newShapes);
    }
  };

  const download = () => {
    stageRef.current.find('Transformer').forEach(function (transformer) {
      transformer.nodes([]);
    });
    const dataURL = stageRef.current.toDataURL();
    //const dataURL = stageRef.current.toDataURL({quality:1, width:800, height:800, pixelRatio:10});
    const currentTime = new Date();
    var fileName = 'sitePlan' + currentTime.getTime() + '.png';
    const link = document.createElement('a');
    link.href = dataURL;
    link.download = fileName;
    link.click();
  };

  const save = () => {
    stageRef.current.find('Transformer').forEach(function (transformer) {
      transformer.nodes([]);
    });
    //doMutation([stageRef.current.toDataURL({quality:1, width:800, height:800, pixelRatio:10}), shapes]);
    doMutation([stageRef.current.toDataURL(), shapes]);
  };

  const clearAll = () => {
    setShapes([]);
  };

  /* Render */
  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <MainCard content={false} ref={mainCardDragDropRef}>
          <CardContent>
            <Grid item style={{ display: 'flex', gap: '10px', marginBottom: '10px' }}>
              <Button variant="contained" onClick={deleteItem}>
                Delete
              </Button>
              <Button variant="contained" onClick={moveToBottom}>
                MoveToBottom
              </Button>
              <Button variant="contained" onClick={moveToTop}>
                MoveToTop
              </Button>
              <Button variant="contained" onClick={download}>
                Download PNG
              </Button>
              <Button variant="contained" onClick={downloadSitePlan}>
                Download PDF
              </Button>
              <Button variant="contained" onClick={clearAll}>
                ClearAll
              </Button>
            </Grid>
            <Grid item xs={12} container>
              <Grid item container xs={7.2}>
                <Grid
                  item
                  container
                  xs={12}
                  id="left-column"
                  ref={leftColumn}
                  onDrop={dropHandler}
                  onDragOver={allowDropHandler}
                  style={{ border: '1px solid #bfbfbf', width: '100%', height: '75vh', overflow: 'hidden' }}
                >
                  <Grid item xs={12}>
                    <Stage
                      width={stageSize.width || leftColumnWidth.current}
                      height={stageSize.height || leftColumnHeight.current}
                      onMouseDown={checkDeselect}
                      onTouchStart={checkDeselect}
                      ref={stageRef}
                    >
                      <Layer>
                        {shapes.map((e, i) => {
                          return (
                            <Shape
                              key={i}
                              shape={e}
                              isSelected={e.id === selectedId}
                              onSelect={() => {
                                selectShape(e.id);
                              }}
                              onChange={(newAttrs) => {
                                const newShapes = [...shapes];
                                newShapes[i].attrs = newAttrs;
                                setShapes(newShapes);
                              }}
                            />
                          );
                        })}
                      </Layer>
                    </Stage>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={4.8} container>
                <Grid
                  item
                  xs={12}
                  id="right-column"
                  ref={rightColumn}
                  style={{ border: '1px solid #bfbfbf', borderLeft: '0', height: '75vh' }}
                >
                  <ImageList
                    variant="woven"
                    sx={{ width: 'calc(100% - 20px)', height: 'calc(100% - 20px)', marginLeft: '10px', marginRight: '10px' }}
                    cols={4}
                    gap={10}
                  >
                    {sitePlanData &&
                      sitePlanData.map((e) => {
                        if (e.type === 'img') {
                          return (
                            <ImageListItem key={e.id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                              <img
                                style={{ cursor: 'move', height: 'auto' }}
                                src={dashImage(`${e.src}`)}
                                alt={e.alt || ''}
                                data-type={e.type}
                                data-id={e.id}
                                onDragStart={dragStartHandler}
                                onTouchStart={touchStartHandler}
                                onTouchMove={touchMoveHandler}
                                onTouchEnd={touchEndHandler}
                                width={e.width}
                              />
                            </ImageListItem>
                          );
                        } else if (e.type === 'text') {
                          return (
                            <ImageListItem key={e.id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                              <span
                                style={e.styles}
                                src={dashImage(`${e.src}`)}
                                alt={e.alt || ''}
                                data-type={e.type}
                                data-id={e.id}
                                onDragStart={dragStartHandler}
                                onTouchStart={touchStartHandler}
                                onTouchMove={touchMoveHandler}
                                onTouchEnd={touchEndHandler}
                                draggable={true}
                                width={e.width}
                                data-content={e.content}
                                data-fillstyle={e.fillstyle}
                                data-fontfamily={e.fontfamily}
                                data-fontsize={e.fontsize}
                                data-fontweight={e.fontweight}
                              >
                                {e.content}
                              </span>
                            </ImageListItem>
                          );
                        }
                      })}
                  </ImageList>
                </Grid>
              </Grid>
            </Grid>
            <Grid item container xs={12} style={{ paddingTop: '10px' }}>
              <Grid item container xs={12}>
                <Grid item xs={12} style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end' }}>
                  <Button variant="contained" onClick={save}>
                    Save
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          </CardContent>
        </MainCard>
      </Grid>
    </Grid>
  );
};

SitePlanStage.propTypes = {
  quoteId: PropTypes.string
};

export default SitePlanStage;
