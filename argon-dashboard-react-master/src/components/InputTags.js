import React from 'react'
import { UncontrolledAlert , Input } from "reactstrap";

class InputTags extends React.Component {
    constructor() {
      super();
      
      this.state = {
        tags: [
          'PHP',
          'Java'
        ]
      };
    }
    
    removeTag = (i) => {
      const newTags = [ ...this.state.tags ];
      newTags.splice(i, 1);
      this.setState({ tags: newTags });
    }
  
    inputKeyDown = (e) => {
      const val = e.target.value;
      if (e.key === 'Enter' && val) {
        if (this.state.tags.find(tag => tag.toLowerCase() === val.toLowerCase())) {
            
          return;

        }
        console.log(e.target.value)
        this.setState({ tags: [...this.state.tags, val]});
        
        e.target.value = null;
      } else if (e.key === 'Backspace' && !val) {
        this.removeTag(this.state.tags.length - 1);
      } 
    }
  
    render() {
      const { tags } = this.state;
  
      return (
        <div className="input-tag">

          <ul className="input-tag__tags">
          <Input  onChange={(e) => tags }   value={tags} placeholder='Example : JAVA ...' className='form-control-alternative' type="text" onKeyDown={this.inputKeyDown} ref={c => { this.tagInput = c; }} />
<br></br>
            { tags.map((tag, i) => (
                <UncontrolledAlert  color='info' >
              <li key={tag}>
                {tag}
               
              </li>
              </UncontrolledAlert>
            ))}
         
          </ul>
        </div>
      );
    }
  }
  export default InputTags