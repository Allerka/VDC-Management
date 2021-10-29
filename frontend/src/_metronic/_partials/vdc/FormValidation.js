import * as Yup from 'yup';
import { yupToFormErrors } from 'formik';

const today = new Date().getFullYear();

export const Validation = Yup.object().shape({
    r_name: Yup.string()
        .max(50, "Must be 50 characters or less")
        .required("Required"),
    r_email: Yup.string()
        .email("Invalid email addresss"),
    r_phone: Yup.string()
        .matches(/^[\d]{3}[\s-]?[\d]{3}[\s-]?[\d]{4}$/, "Must be ########## or ###-###-####"),
    r_mobile: Yup.string()
        .matches(/^[\d]{3}[\s-]?[\d]{3}[\s-]?[\d]{4}$/, "Must be ########## or ###-###-####"),
    t_is_r: Yup.boolean(),
    t_name: Yup.string()
        .when('t_is_r', {
            is: (t_is_r) => (t_is_r === false) === true,
            then: Yup.string().required("Required"),
        })
        .max(50, "Must be 50 characters or less"),
    t_email: Yup.string()
        .when('t_is_r', {
            is: (t_is_r) => (t_is_r === false) === true,
            then: Yup.string().required("Required"),
        })
        .email("Invalid email addresss"),
    t_phone: Yup.string()
        .when('t_is_r', {
            is: (t_is_r) => (t_is_r === false) === true,
            then: Yup.string().required("Required"),
        })
        .matches(/^[\d]{3}[\s-]?[\d]{3}[\s-]?[\d]{4}$/, "Must be ########## or ###-###-####"),

    year: Yup.number()
        .typeError("That's not a year")
        .min(1950, "Must be after 1950")
        .max(today, "Must be ${max} or earlier"),
    make: Yup.string()
        .max(50, "Must be 50 characters or less")
        .matches(/^[a-zA-Z]*$/, "Letters only")
        .required("Required"),
    model: Yup.string()
        .max(50, "Must be 50 characters or less")
        .matches(/^[a-zA-Z0-9]*$/, "Letters and numbers only")
        .required("Required"),
    identifier: Yup.string()
        .max(50, "Must be 50 characters or less"),
    color: Yup.string()
        .max(20, "Must be 20 characters or less")
        .matches(/^[a-zA-Z\s*]*$/, "Letters and spaces only"),
    customer: Yup.string()
        .max(50, "Must be 50 characters or less")
        .required("Required"),
    vin: Yup.string()
        .matches(/^[a-zA-Z0-9]*$/, "Letters and numbers only")
        .min(17, "Must be 17 characters")
        .max(17, "Must be 17 characters")
        .when('no_vin', {
            is: (no_vin) => (no_vin === false) === true,
            then: Yup.string().required("Required")
        }),
    // veh_type: Yup.string()
    //     .matches(/^(?!NONE).*$/, "Required"),
    f_pressure: Yup.number()
        .typeError("Must be a number")
        .positive("Must be a positive number"),
    r_pressure: Yup.number()
        .typeError("Must be a number")
        .positive("Must be a positive number"),
    fuel_type_other: Yup.string()
        .when('fuel_type', {
            is: 'Other',
            then: Yup.string().required("Required")
        })
        .matches(/^[a-zA-Z0-9]*$/, "Letters and numbers only")
        .max(50, "Must be 50 characters or less"),
    fuel_cap: Yup.number()
        .typeError("Must be a number")
        .when('veh_type', {
            is: (veh_type) => (veh_type === 'BEV'),
            then: Yup.number().required("Required")
        })
        .positive("Must be a positive number"),
    // regulation: Yup.string()
    //     .matches(/^(?!none).*$/, "Required"),
    // cert_level: Yup.string()
    //     .required("Required"),
    // eng_family: Yup.string()
    //     .when('regulation', {
    //         is: (regulation) => (regulation === '86' || regulation === '1066'),
    //         then: Yup.string().matches(/^[a-zA-Z0-9.]*$/, "Letters, numbers and periods only")
    //         .required("Required"),
    //     }),
    // emi_family: Yup.string()
    //     .when('regulation', {
    //         is: (regulation) => (regulation === '86' || regulation === '1066'),
    //         then: Yup.string().matches(/^[a-zA-Z0-9.]*$/, "Letters, numbers and periods only")
    //         .required("Required"),
    //     }),
    // marmon: Yup.string()
    //     .when('veh_type', {
    //         is: (veh_type) => (veh_type !== 'BEV'),
    //         then: Yup.string().matches(/^(?!none).*$/, "Required"),
    //     }),
    marmon_distance: Yup.number()
        .when('veh_type', {
            is: (veh_type) => (veh_type !== 'BEV' && veh_type !== 'NONE'),
            then: Yup.number().positive("Must be a positive number"),
        }),
    usable_bat: Yup.number()
        .when('veh_type', {
            is: (veh_type) => (veh_type !== 'ICE' && veh_type !== 'NONE'),
            then: Yup.number().positive("Must be a positive number"),
        }),
    nom_bat: Yup.number()
        .when('veh_type', {
            is: (veh_type) => (veh_type === 'BEV' || veh_type === 'PHEV'),
            then: Yup.number().positive("Must be a positive number"),
        }),
    all_range:Yup.number()
        .when('veh_type', {
            is: (veh_type) => (veh_type === 'BEV' || veh_type === 'PHEV'),
            then: Yup.number().positive("Must be a positive number"),
        }),
    cscm:Yup.number()
        .when('veh_type', {
            is: (veh_type) => (veh_type === 'BEV' || veh_type === 'PHEV'),
            then: Yup.number().positive("Must be a positive number"),
        }),

    country: Yup.string(),
    //     .required("Required"),
    // dyno_mode: Yup.string()
    //     .matches(/^(?!NONE).*$/, "Required"),
    mass_usa: Yup.number()
        .when('country', {
            is: (country) => (country === 'US' || country === 'USM'),
            then: Yup.number().positive("Must be a positive number"),
        }),
    test_mass_eu: Yup.number()
        .when('country', {
            is: (country) => (country === 'US' || country === 'USM' || country === 'NONE') === false,
            then: Yup.number().positive("Must be a positive number"),
        }),
    mass_ro: Yup.number()
        .when('country', {
            is: (country) => (country === 'US' || country === 'USM' || country === 'NONE') === false,
            then: Yup.number().positive("Must be a positive number"),
        }),
    mass_coc: Yup.number()
        .when('country', {
            is: (country) => (country === 'US' || country === 'USM' || country === 'NONE') === false,
            then: Yup.number().positive("Must be a positive number"),
        }),
    coeff1: Yup.number()
        .when('country', {
            is: (country) => (country !== 'NONE'),
            then: Yup.number().positive("Must be a positive number"),
        }),
    coeff2: Yup.number()
        .when('country', {
            is: (country) => (country !== 'NONE'),
            then: Yup.number().positive("Must be a positive number"),
        }),
    coeff3: Yup.number()
        .when('country', {
            is: (country) => (country !== 'NONE'),
            then: Yup.number().positive("Must be a positive number"),
        }),
    cold_co1: Yup.number()
        .when('country', {
            is: (country) => (country === 'US' || country === 'USM'),
            then: Yup.number().positive("Must be a positive number")
            // .required("Required")
        }),
        // .positive("Must be a positive number"),
    cold_co2: Yup.number()
        .when('country', {
            is: (country) => (country === 'US' || country === 'USM'),
            then: Yup.number().positive("Must be a positive number")
            // .required("Required")
        }),
        // .positive("Must be a positive number"),
    cold_co3: Yup.number()
        .when('country', {
            is: (country) => (country === 'US' || country === 'USM'),
            then: Yup.number().positive("Must be a positive number")
            // .required("Required")
        }),
        // .positive("Must be a positive number"),
    // wheelbase: Yup.number()
    //     .positive("Must be a positive number"),
        // .required("Required"),
    // coastdown: Yup.string()
    //     .matches(/^(?!none).*$/, "Required"),
    // dyno_roll: Yup.string()
    //     .matches(/^(?!none).*$/, "Required"),
    d_rings: Yup.boolean(),
    front_alt: Yup.string()
        .matches(/^[a-zA-Z0-9]*$/, "Letters and numbers only")
        .max(50, "Must be 50 characters or less"),
    front_hooks: Yup.string()
        .when('d_rings', {
            is: (d_rings) => (d_rings === false) === true,
            then: Yup.string().required("Required")
        }),
    rear_alt: Yup.string()
        .matches(/^[a-zA-Z0-9]*$/, "Letters and numbers only")
        .max(50, "Must be 50 characters or less"),
    rear_hooks: Yup.string()
        .when('d_rings', {
            is: (d_rings) => (d_rings === false) === true,
            then: Yup.string().required("Required")
        }),
    desc: Yup.string()
        .matches(/^[a-zA-Z0-9,.\s]*$/, "No special characters, please")
        .max(512, "Must be 512 characters or less"),

    charge_num: Yup.string()
        .max(50, "Must be 50 characters or less")
        .matches(/^[a-zA-Z0-9.]*$/, "Letters, numbers, and periods only"),
    license: Yup.string()
        .matches(/^[a-zA-Z0-9\s]*$/, "Letters, numbers, and spaces only")
        .max(10, "Must be 10 characters or less"),
    displacement: Yup.number()
        .positive("Must be a positive number"),
        // .required("Required"),
    cylinders: Yup.number()
        .positive("Must be a positive number"),
        // .required("Required"),
    transmission: Yup.string()
        .max(20, "Must be 20 characters or less")
        .matches(/^[a-zA-Z0-9]*$/, "Letters and numbers only"),
    gears: Yup.number()
        .positive("Must be a positive number"),
        
});


export const TestValidation = Yup.object().shape({
	fan_coeff_1: Yup.number()
        .min(0),
	fan_coeff_2: Yup.number()
        .min(0),
	fan_coeff_3: Yup.number()
        .min(0),
	idle_high: Yup.number(),
	dump_time: Yup.number()
        .min(0),
});

// export default validation;