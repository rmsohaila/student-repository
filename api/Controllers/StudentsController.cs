using AutoMapper;
using Cap_NoArch.Data;
using Cap_NoArch.Data.Entities;
using Cap_NoArch.DataTransferObjects.Student;
using Cap_NoArch.Responses.FamilyMember;
using Cap_NoArch.Responses.Student;
using Cap_NoArch.Services.Interfaces;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using ModelStateValidation.ActionFilters;

namespace Cap_NoArch.Controllers;

public class StudentsController : ApiControllerBase
{
    private readonly IStudentService _studentService;
    private readonly IFamilyMemberServices _familyMemberServices;
    private readonly IMapper _mapper;

    public StudentsController(
        IStudentService studentService,
        IFamilyMemberServices familyMemberServices,
        IMapper mapper,
        ILogger<StudentsController> logger
    ) : base(logger)
    {
        _studentService = studentService;
        _familyMemberServices = familyMemberServices;
        _mapper = mapper;
    }

    #region GET

    [HttpGet]
    public async Task<IList<StudentResponse>> GetAllStudents()
    {
        var students = await _studentService.GetAllStudentsAsync();

        return _mapper.Map<List<StudentResponse>>(students);
    }

    [HttpGet("{id}/Nationality")]
    public async Task<IActionResult> GetNationalityOfAStudent(int id)
    {
        try
        {
            var existingStudent = await _studentService.GetStudentByIdAsync(id);

            if (existingStudent is null)
                return NotFoundResponse($"ID#{id} not found in the database");

            _logger.LogInformation("Updated");

            return Success(_mapper.Map<StudentWithNationalityResponse>(existingStudent));
        }
        catch (Exception ex)
        {
            return InternalServerErrorResponse("An error occured", ex);
        }
    }

    [HttpGet("{id}/FamilyMembers")]
    public async Task<IActionResult> GetFamilyMembersOfStudent(int id)
    {
        try
        {
            var members = await _familyMemberServices.GetAllFamilyMembersOfStudentAsync(id);
            
            return Success(_mapper.Map<IList<StudentFamilyMemberResponse>>(members));
        }
        catch (Exception ex)
        {
            return InternalServerErrorResponse("An error occured", ex);
        }
    }

    #endregion

    #region POST
    
    [HttpPost]
    [ServiceFilter(typeof(ValidationFilterAttribute))]
    public async Task<IActionResult> CreateStudent([FromBody] CreateStudentRequest request)
    {
        try
        {
            // Map studentDto to Student entity and save it to your data source
            var newStudent = _mapper.Map<Student>(request);

            // Create student entity
            var createdStudent = await _studentService.CreateStudentAsync(newStudent);

            // Map student entity to response object
            var response = _mapper.Map<StudentResponse>(createdStudent);

            _logger.LogInformation("Student created: {0}", response.ToString());

            return Created(response);
        }
        catch (AutoMapperMappingException ex)
        {
            return InternalServerErrorResponse();
        }
        catch (Exception ex)
        {
            return BadRequestResponse(ex.Message);
        }
    }

    [HttpPost("{id}/FamilyMembers")]
    [ServiceFilter(typeof(ValidationFilterAttribute))]
    public async Task<IActionResult> CreateFamilyMemberOfStudent(int id, [FromBody] CreateFamilyMemberRequest request)
    {
        try
        {
            var existingStudent = await _studentService.GetStudentByIdAsync(id);

            if (existingStudent is null)
                return NotFoundResponse($"ID#{id} not found in the database");

            var newMember = _mapper.Map<FamilyMember>(request);
            newMember.StudentId = id;

            var createdMember = await _familyMemberServices.CreateFamilyMemberAsync(newMember);

            // Map Family Member entity to response object
            var response = _mapper.Map<StudentFamilyMemberResponse>(createdMember);

            _logger.LogInformation("Family member created: {0}", response.ToString());

            return Created(response);
        }
        catch (AutoMapperMappingException ex)
        {
            return InternalServerErrorResponse();
        }
        catch (Exception ex)
        {
            return InternalServerErrorResponse("An error occured FM", ex);
        }
    }

    #endregion


    #region PUT

    [HttpPut("{id}")]
    [ServiceFilter(typeof(ValidationFilterAttribute))]
    public async Task<IActionResult> UpdateStudent(int id, [FromBody] UpdateStudentRequest request)
    {
        if (request.ID != id)
            return BadRequestResponse("ID mismatch between the associated route.");

        try
        {
            var existingStudent = await _studentService.GetStudentByIdAsync(id);

            if (existingStudent is null)
                return NotFoundResponse($"ID#{id} not found in the database");

            existingStudent.FirstName = request.FirstName.Trim();
            existingStudent.LastName = request.LastName.Trim();
            existingStudent.DateOfBirth = request.DateOfBirth;

            var response = _mapper.Map<StudentResponse>(
                await _studentService.UpdateStudentAsync(existingStudent));

            return Success(response);
        }
        catch (Exception ex)
        {
            return InternalServerErrorResponse("An error occurred", ex);
        }
    }

    [HttpPut("{id}/Nationality/{nationalityId}")]
    public async Task<IActionResult> UpdateNationalityOfAStudent(int id, int nationalityId)
    {
        try
        {
            var existingStudent = await _studentService.GetStudentByIdAsync(id);

            if (existingStudent is null)
                return NotFoundResponse($"ID#{id} not found in the database");

            //
            // Verify nationalityId is valid
            //

            existingStudent.NationalityId = nationalityId;
            await _studentService.UpdateStudentAsync(existingStudent);

            return Success(_mapper.Map<StudentWithNationalityResponse>(existingStudent));
        }
        catch (Exception ex)
        {
            return InternalServerErrorResponse("An error occured", ex);
        }
    }

    #endregion

    #region DELETE

    #endregion
}
