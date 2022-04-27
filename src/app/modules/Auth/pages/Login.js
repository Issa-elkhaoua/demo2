import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { connect } from "react-redux";
import { FormattedMessage, injectIntl } from "react-intl";
import * as auth from "../_redux/authRedux";
import { login } from "../_redux/authCrud";

/*
  INTL (i18n) docs:
  https://github.com/formatjs/react-intl/blob/master/docs/Components.md#formattedmessage
*/

/*
  Formik+YUP:
  https://jaredpalmer.com/formik/docs/tutorial#getfieldprops
*/

const initialValues = {
  email: "admin@demo.com",
  password: "demo",
};

function Login(props) {
  const { intl } = props;
  const [loading, setLoading] = useState(false);
  const LoginSchema = Yup.object().shape({
    email: Yup.string()
      .email("Wrong email format")
      .min(3, "Minimum 3 symbols")
      .max(50, "Maximum 50 symbols")
      .required(
        intl.formatMessage({
          id: "AUTH.VALIDATION.REQUIRED_FIELD",
        })
      ),
    password: Yup.string()
      .min(3, "Minimum 3 symbols")
      .max(50, "Maximum 50 symbols")
      .required(
        intl.formatMessage({
          id: "AUTH.VALIDATION.REQUIRED_FIELD",
        })
      ),
  });

  const enableLoading = () => {
    setLoading(true);
  };

  const disableLoading = () => {
    setLoading(false);
  };

  const getInputClasses = (fieldname) => {
    if (formik.touched[fieldname] && formik.errors[fieldname]) {
      return "is-invalid";
    }

    if (formik.touched[fieldname] && !formik.errors[fieldname]) {
      return "is-valid";
    }

    return "";
  };

  const formik = useFormik({
    initialValues,
    validationSchema: LoginSchema,
    onSubmit: (values, { setStatus, setSubmitting }) => {
      enableLoading();
      setTimeout(() => {
        login(values.email, values.password)
          .then(({ data: { accessToken } }) => {
            disableLoading();
            props.login(accessToken);
          })
          .catch(() => {
            disableLoading();
            setSubmitting(false);
            setStatus(
              intl.formatMessage({
                id: "AUTH.VALIDATION.INVALID_LOGIN",
              })
            );
          });
      }, 1000);
    },
  });

  return (
    
<div className="login login-signin-on login-3 d-flex flex-row-fluid" id="kt_login">
    <div className="d-flex flex-center flex-row-fluid bgi-size-cover bgi-position-top bgi-no-repeat" style={{ backgroundImage: 'url(assets/media/bg/bg-3.jpg)' }}>
        <div className="login-form  p-7 position-relative overflow-hidden">
            {/*begin::Login Header*/}
            <div className="d-flex flex-center mb-15">
                <a href="#">
                    <img src="assets/media/logos/logo-letter-13.png" className="max-h-75px" alt="" />
                </a>
            </div>
            {/*end::Login Header*/}
            {/*begin::Login Sign in form*/}
            <div className="card card-custom">
                <div className="card-header card-header-tabs-line">
                    <div className="card-body">
                        <div className="login-signin">
                            <div className="mb-20 text-center">
                                <h3>Sign In to eMPower</h3>
                                <div className="text-muted font-weight-bold"><span className="opacity-70 ">New Here ?</span>
                                    <a href="javascript:;" id="kt_login_signup" className="font-weight-bold">Create an Account</a></div>
                            </div>
                            <form
                                onSubmit={formik.handleSubmit}
                                className="form fv-plugins-bootstrap fv-plugins-framework"
                            >

                                <div className="form-group mb-5 pull-left">
                                    <label className="control-label font-weight-bold">Email</label>
                                    <input
                                        placeholder="Email"
                                        type="email"
                                        className={`form-control form-control-solid h-auto py-5 px-6 ${getInputClasses(
                                            "email"
                                        )}`}
                                        name="email"
                                        {...formik.getFieldProps("email")}
                                    />
                                    {formik.touched.email && formik.errors.email ? (
                                        <div className="fv-plugins-message-container">
                                            <div className="fv-help-block">{formik.errors.email}</div>
                                        </div>
                                    ) : null}

                                </div>
                                <div className="form-group mb-5">
                                    <div className=" d-flex flex-wrap justify-content-between ">
                                        <label className="control-label font-weight-bold">Password</label>
                                        <Link
                                            to="/auth/forgot-password"
                                            className="text-dark-50 text-hover-primary my-3 mr-2"
                                            id="kt_login_forgot"
                                        >
                                            <FormattedMessage id="AUTH.GENERAL.FORGOT_BUTTON" />
                                        </Link>
                                    </div>
                                    <input
                                        placeholder="Password"
                                        type="password"
                                        className={`form-control form-control-solid h-auto py-5 px-6 ${getInputClasses(
                                            "password"
                                        )}`}
                                        name="password"
                                        {...formik.getFieldProps("password")}
                                    />
                                    {formik.touched.password && formik.errors.password ? (
                                        <div className="fv-plugins-message-container">
                                            <div className="fv-help-block">{formik.errors.password}</div>
                                        </div>
                                    ) : null}
                                </div>
                                <div className="text-center">
                                    <button
                                        id="kt_login_signin_submit" className="btn  btn-primary font-weight-bold px-9 py-4 my-3 mx-4"
                                        type="submit"
                                        disabled={formik.isSubmitting}

                                    >
                                        <span>Sign In</span>
                                        {loading && <span className="ml-3 spinner spinner-white"></span>}
                                    </button>
                                </div></form>
                        </div></div></div>
                {/*end::Login Sign in form*/}

            </div>
        </div>
    </div>
    {/*end::Login*/}
</div>

  );
}

export default injectIntl(connect(null, auth.actions)(Login));
