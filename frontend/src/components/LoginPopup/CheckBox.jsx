import styled from 'styled-components';

const Checkbox = ({ checked, onChange }) => {
  return (
    <StyledWrapper>
      <div className="checkbox-wrapper">
        <input 
          type="checkbox" 
          className="check" 
          id="custom-checkbox" 
          checked={checked} 
          onChange={onChange} 
        />
        <label htmlFor="custom-checkbox" className="label">
          <svg width={45} height={45} viewBox="0 0 95 95">
            <rect x={30} y={20} width={50} height={50} stroke="black" fill="none" />
            <g transform="translate(0,-952.36222)">
              <path d="m 56,963 c -102,122 6,9 7,9 17,-5 -66,69 -38,52 122,-77 -7,14 18,4 29,-11 45,-43 23,-4" 
                stroke="black" strokeWidth={3} fill="none" className="path1" 
              />
            </g>
          </svg>
          <span>By continuing, I agree to the terms of use & privacy policy.</span>
        </label>
      </div>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  .checkbox-wrapper input[type="checkbox"] {
    visibility: hidden;
    display: none;
  }

  .checkbox-wrapper * {
    box-sizing: border-box;
    user-select: none;
  }

  .checkbox-wrapper {
    position: relative;
    display: flex;
    align-items: center;
    gap: 10px;
    overflow: hidden;
  }

  .checkbox-wrapper .label {
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 10px;
  }

  .checkbox-wrapper .check {
    width: 50px;
    height: 50px;
    position: absolute;
    opacity: 0;
  }

  .checkbox-wrapper .label svg {
    vertical-align: middle;
  }

  .checkbox-wrapper .path1 {
    stroke-dasharray: 400;
    stroke-dashoffset: 400;
    transition: .5s stroke-dashoffset;
    opacity: 0;
  }

  .checkbox-wrapper .check:checked + label svg g path {
    stroke-dashoffset: 0;
    opacity: 1;
  }
`;

export default Checkbox;
