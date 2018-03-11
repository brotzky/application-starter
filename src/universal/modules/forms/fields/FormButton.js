import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button } from 'gac-ui/components';

export class FormButton extends Component {
  hasPermission() {
    const { permissions, permission } = this.props;
    return permission && permissions ? Boolean(permissions[permission]) : true;
  }

  render() {
    const {
      isSubmitting,
      disabled,
      icon,
      status,
      buttonText,
      type,
      onClick,
      appearance,
      size,
      width,
      margin,
    } = this.props;
    const isDisabled = disabled || isSubmitting || !this.hasPermission();
    const Icon = icon;

    return (
      <div>
        <Button
          type={type || 'submit'}
          disabled={isDisabled}
          onClick={typeof onClick === 'function' ? onClick : () => {}}
          hasPermission={this.hasPermission()}
          isSubmitting={isSubmitting}
          appearance={appearance}
          text={buttonText}
          size={size || 'small'}
          width={width}
          margin={margin}
        />
        {icon && <Icon />}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  permissions: (state.permissions && state.permissions.permissions) || {},
});

export default connect(mapStateToProps)(FormButton);
