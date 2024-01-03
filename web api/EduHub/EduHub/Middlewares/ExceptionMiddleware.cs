using EduHub.Models;
using System.Net;

namespace EduHub.Middlewares
{
    public class ExceptionMiddleware : IMiddleware
    {
        private readonly ILogger<ExceptionMiddleware> _logger;
        public ExceptionMiddleware(ILogger<ExceptionMiddleware> logger)
        {
            _logger = logger;
        }

        public async Task InvokeAsync(HttpContext context, RequestDelegate next)
        {
            try
            {
                await next(context);
            }
            catch (Exception ex)
            {
                _logger.LogError($"Something Went Wrong");
                await HandleException(context, ex);

            }
        }

        private static Task HandleException(HttpContext context , Exception ex)
        {
            int statusCode = (int)HttpStatusCode.InternalServerError;
            var errorResponse = new ErrorResponse
            {
                StatusCode = statusCode,
                Message = ex.Message
            };

            context.Response.ContentType = "application/json";
            context.Response.StatusCode = statusCode;   
            return context.Response.WriteAsync(errorResponse.ToString());

        }
    }

    public static class ExceptionMiddlewareExtension
    {
        public static void ConfigureExceptionMiddleware(this IApplicationBuilder app)
        {
            app.UseMiddleware<ExceptionMiddleware>();
        }
    }
}
