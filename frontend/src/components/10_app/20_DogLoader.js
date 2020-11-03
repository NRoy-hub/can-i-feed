import React from 'react';
import StyledDiv from 'style/10_app/20_DogLoader';

export default function DogLoader(){
  return(
    <StyledDiv className="dog_loader">
      <div className="dog">
        <div className="dog-body">
          <div className="dog-tail">
          </div>
        </div>
        <div className="dog-torso"></div>
        <div className="dog-head">
          <div className="dog-ears">
              <div className="dog-ear"></div>
              <div className="dog-ear"></div>
          </div>
          <div className="dog-eyes">
              <div className="dog-eye"></div>
              <div className="dog-eye"></div>
          </div>
          <div className="dog-muzzle">
              <div className="dog-tongue"></div>
          </div>
        </div>
      </div>
    </StyledDiv>
  );
}