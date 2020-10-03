import React from 'react';
import {
  ProgressBarWrapper,
  ProgressStep,
  ProgressBar,
  StatusTitle,
  StatusBox,
  StatusDetails,
  CheckMarkWrapper,
} from './progress-box.style';
import { CheckMark } from 'assets/icons/CheckMark';

type ProgressProps = {
  data?: any;
  status?: any;
};

const ProgressBox: React.FC<ProgressProps> = ({ status, data }) => {
  const keys = Object.keys(data);
  const values = Object.values(data);
  return (
    <>
      {keys.map((item, index) => (
        <ProgressStep key={index}>
          <ProgressBarWrapper
            className={keys.indexOf(status) >= index ? 'checked' : ''}
          >
            <StatusBox>
              {keys.indexOf(status) >= index ? (
                <CheckMarkWrapper>
                  <CheckMark />
                </CheckMarkWrapper>
              ) : (
                index
              )}
            </StatusBox>
            <ProgressBar />
          </ProgressBarWrapper>
          <StatusDetails>
            {values[index] ? <StatusTitle>{values[index]}</StatusTitle> : ''}
          </StatusDetails>
        </ProgressStep>
      ))}
    </>
  );
};

export default ProgressBox;
