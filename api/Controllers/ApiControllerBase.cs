using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace Cap_NoArch.Controllers;

[ApiController]
[Route("api/[controller]")]
[Produces("application/json")]
public abstract class ApiControllerBase : ControllerBase
{
    protected readonly ILogger<ApiControllerBase> _logger;

    protected ApiControllerBase(ILogger<ApiControllerBase> logger)
    {
        _logger = logger;
    }

    // Common HTTP responses
    #region Success Responses
    protected IActionResult Success(object data = null)
    {
        return Ok(data);
    }

    protected IActionResult Created(object data = null)
    {
        return base.Ok(data);
    }
    #endregion

    #region Error Responses
    protected IActionResult ErrorResponse(bool success, string message, int statusCode, List<string> errors = null)
    {
        return StatusCode(statusCode, new { success, message, errors });
    }

    protected IActionResult BadRequestResponse(string message)
    {
        return ErrorResponse(false, message, 400);
    }

    protected IActionResult UnprocessableEntityResponse(string message, List<string> errors = null)
    {
        return ErrorResponse(false, message, 422, errors);
    }

    protected IActionResult NotFoundResponse(string message = "Resource not found")
    {
        return ErrorResponse(false, message, 404);
    }

    protected IActionResult InternalServerErrorResponse(string message = "An error occurred", Exception exception = null)
    {
        _logger.LogError(exception.ToString());
        return ErrorResponse(false, message, 500);
    }
    #endregion

    #region Validation
    protected IActionResult ValidateModel()
    {
        if (!ModelState.IsValid)
        {
            var errors = ModelState.Values
                .SelectMany(v => v.Errors)
                .Select(e => e.ErrorMessage)
                .ToList();

            return UnprocessableEntityResponse("Validation failed", errors);
        }

        return null;
    }
    #endregion

    #region Logging
    protected void LogInformation(string message)
    {
        _logger.LogInformation(message);
    }

    protected void LogWarning(string message)
    {
        _logger.LogWarning(message);
    }

    protected void LogError(string message)
    {
        _logger.LogError(message);
    }
    #endregion
}
