import React, { Component } from 'react';
import { connect } from 'react-redux';
import Spinner from '../../ui/spinner/spinner';

export class FormButton extends Component {
  hasPermission() {
    const { permissions, permission } = this.props;
    return permission && permissions ? Boolean(permissions[permission]) : true;
  }

  render() {
    const {
      className,
      isSubmitting,
      disabled,
      icon,
      status,
      buttonText,
      type,
      onClick,
    } = this.props;
    const isDisabled = disabled || isSubmitting || !this.hasPermission();
    const Icon = icon;

    return (
      <div
        className={`
        FormField
        ${className ? `${className}Field` : ''}
      `}
      >
        <button
          type={type || 'submit'}
          disabled={isDisabled}
          onClick={typeof onClick === 'function' ? onClick : () => {}}
          className={`
            c-button
            c-button--pri 
            FormButton  
            ${className}Button
            ${this.hasPermission() ? '' : 'PermissionRequired'}
            ${status === true ? 'FormButton--success' : ''}
            ${status === false ? 'FormButton--failure' : ''}
            ${isSubmitting ? 'FormButton--submitting' : ''}
            ${isSubmitting ? `${className}Button--submitting` : ''}
            ${disabled ? `${className}Button--disabled` : ''}
          `}
        >
          {(() => {
            if (isSubmitting) {
              return (
                <span>
                  <Spinner />
                </span>
              );
            } else if (status === true) {
              // return <span><Check /></span>;
              return <span>Check</span>;
            } else if (status === false) {
              // return <span><Alert /></span>;
              return <span>Alert</span>;
            }
            return (
              <span>
                {buttonText}{' '}
                {icon && <Icon className={`${className}Button__icon`} />}
              </span>
            );
          })()}
        </button>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  permissions: (state.permissions && state.permissions.permissions) || {},
});

export default connect(mapStateToProps)(FormButton);
