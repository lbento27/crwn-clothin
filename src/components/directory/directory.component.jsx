import React from "react";

import MenuItem from "../menu-item/menu-item.component";

import "./directory.styles.scss";

import { connect } from "react-redux";
import { selectDirectorySections } from "../../redux/directory/diretory.selectors";
import { createStructuredSelector } from "reselect";

const Directory = ({ sections }) => {
  return (
    <div className="directory-menu">
      {/* {this.state.sections.map(({ title, imageUrl, id, size , linkUrl }) => (
          <MenuItem key={id} title={title} imageUrl={imageUrl} size={size} linkUrl={linkUrl} />
        ))} we can use the spread operator to pass this props this is equivalent */}
      {sections.map(({ id, ...otherSections }) => (
        <MenuItem key={id} {...otherSections} />
      ))}
    </div>
  );
};

const mapStateToProps = state =>
  createStructuredSelector({
    sections: selectDirectorySections
  });

export default connect(mapStateToProps)(Directory);
