import React, { useState } from 'react';
import ThreeDView from '../../components/ThreeDView';
import PanoView from '../../components/PanoView';
import { CircularProgress } from '@material-ui/core';
import Slider from '../Slider/Slider';
import { slicer } from './data';
import Comments from '../Comments/Comments';
import ItemsList from '../common/List/List';
import {
  GENESIS,
  GENESIS_THREE_D_LENGTH,
  HYUNDAI,
  HYUNDAI_THREE_D_LENGTH,
} from 'constants/constants';

const CameraRender = ({
  brand,
  data,
  cameraControls,
  showComments,
  filterComments,
  vanityURL,
}) => {
  const [frameNum, setFrame] = useState(0);

  const allImages = data.reduce(
    (prev, current) => prev.concat(current.images),
    []
  );
  const cameraIndex = allImages.findIndex((img) =>
    img.endsWith(cameraControls.value)
  );

  try {
    if (cameraIndex < 0) throw new Error('invalid camera');

    const { title } = cameraControls.data.filter(
      (cam) => cam.value === cameraControls.value
    )[0];
    if (title.toLowerCase().includes('360')) {
      const threeDLength =
        brand === HYUNDAI
          ? HYUNDAI_THREE_D_LENGTH
          : brand === GENESIS
          ? GENESIS_THREE_D_LENGTH
          : 36;

      return (
        <ThreeDView
          images={allImages.slice(cameraIndex, cameraIndex + threeDLength)}
          frame={frameNum}
          setFrame={setFrame}
        />
      );
    } else if (title.toLowerCase().includes('pano')) {
      return <PanoView src={`${allImages[cameraIndex]}`} />;
    } else {
      return (
        <>
          <div className="single-car">
                <Slider
                  imageSource={`${allImages[cameraIndex]}`}
                  slicer={slicer}
                />
                {showComments && (
                  <div className="show-comment">
                    <Comments
                      title="COMMENTS"
                      details={<ItemsList list={filterComments} />}
                    />
                  </div>
                )}
          </div>
        </>
      );
    }
  } catch (error) {
    return (
      <div className="single-view">
        <CircularProgress />
      </div>
    );
  }
};

export default CameraRender;
