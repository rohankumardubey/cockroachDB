// Copyright 2018 The Cockroach Authors.
//
// Use of this software is governed by the Business Source License
// included in the file licenses/BSL.txt.
//
// As of the Change Date specified in that file, in accordance with
// the Business Source License, use of this software will be governed
// by the Apache License, Version 2.0, included in the file
// licenses/APL.txt.

import classNames from "classnames/bind";
import React from "react";

import { FormatQuery } from "src/util";

import { api as clusterUiApi } from "../index";

import { Highlight } from "./highlight";
import styles from "./sqlhighlight.module.scss";

export enum SqlBoxSize {
  SMALL = "small",
  LARGE = "large",
  CUSTOM = "custom",
}

export interface SqlBoxProps {
  value: string;
  zone?: clusterUiApi.DatabaseDetailsResponse;
  className?: string;
  size?: SqlBoxSize;
  format?: boolean;
}

const cx = classNames.bind(styles);

export class SqlBox extends React.Component<SqlBoxProps> {
  preNode: React.RefObject<HTMLPreElement> = React.createRef();
  render(): React.ReactElement {
    const value = this.props.format
      ? FormatQuery(this.props.value)
      : this.props.value;
    const sizeClass = this.props.size ? this.props.size : "";
    return (
      <div className={cx("box-highlight", this.props.className, sizeClass)}>
        <Highlight {...this.props} value={value} />
      </div>
    );
  }
}
