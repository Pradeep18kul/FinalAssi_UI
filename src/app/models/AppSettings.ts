export class AppSettings {
    public static ServiceBaseUrl = 'http://localhost/ProjectManagerServices/v1';
    public static UsersBaseUrl = AppSettings.ServiceBaseUrl + '/users';
    public static ProjectsUrl = AppSettings.ServiceBaseUrl + '/projects';
    public static TasksUrl = AppSettings.ServiceBaseUrl + '/tasks';
    public static LoggingUrl = AppSettings.ServiceBaseUrl + '/loggings';

    public static IsoDateFormat = 'yyyy-MM-dd';
    public static StartDateFieldName = 'startDate';
    public static EndDateFieldName = 'endDate';
    public static AlertDanger = 'danger';
    public static AlertDangerClass = 'alert alert-danger alert-dismissible';
    public static AlertSuccess = 'successs';
    public static AlertSuccessClass = 'alert alert-success alert-dismissible';
    public static GenericError = 'There was a problem in processing your request. Please try again later.';

    constructor() {

    }

}
