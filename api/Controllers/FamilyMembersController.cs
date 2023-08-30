using AutoMapper;
using Cap_NoArch.Data;
using Cap_NoArch.Data.Entities;
using Cap_NoArch.DataTransferObjects.FamilyMember;
using Cap_NoArch.DataTransferObjects.Student;
using Cap_NoArch.Responses.FamilyMember;
using Cap_NoArch.Responses.Student;
using Cap_NoArch.Services.Interfaces;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using ModelStateValidation.ActionFilters;

namespace Cap_NoArch.Controllers;

public class FamilyMembersController : ApiControllerBase
{
    private readonly IStudentService _studentService;
    private readonly IFamilyMemberServices _familyMemberServices;
    private readonly IMapper _mapper;

    public FamilyMembersController(
        IStudentService studentService,
        IFamilyMemberServices familyMemberServices,
        IMapper mapper,
        ILogger<FamilyMembersController> logger
    ) : base(logger)
    {
        _studentService = studentService;
        _familyMemberServices = familyMemberServices;
        _mapper = mapper;
    }

    #region GET

    [HttpGet("{id}/Nationality")]
    public async Task<IActionResult> GetNationalityOfFamilyMembersOfStudent(int id)
    {
        try
        {
            var member = await _familyMemberServices.GetFamilyMemberByIdAsync(id);

            if (member is null)
                return NotFoundResponse($"Family Member ID#{id} not found in database.");

            return Success(_mapper.Map<FamilyMemberResponse>(member));
        }
        catch (Exception ex)
        {
            return InternalServerErrorResponse("An error occured", ex);
        }
    }

    #endregion

    #region POST

    #endregion

    #region PUT

    [HttpPut("{id}")]
    [ServiceFilter(typeof(ValidationFilterAttribute))]
    public async Task<IActionResult> UpdateFamilyMember(int id, [FromBody] UpdateFamilyMemberRequest request)
    {
        try
        {
            var existingMember = await _familyMemberServices.GetFamilyMemberByIdAsync(id);

            if (existingMember is null)
                return NotFoundResponse($"ID#{id} not found in the database");

            existingMember.FirstName = request.FirstName.Trim();
            existingMember.LastName = request.LastName.Trim();
            existingMember.DateOfBirth = request.DateOfBirth;
            existingMember.RelationshipId = request.RelationshipId;

            await _familyMemberServices.UpdateFamilyMemberAsync(existingMember);

            var response = _mapper.Map<StudentFamilyMemberResponse>(existingMember);

            return Success(response);
        }
        catch (Exception ex)
        {
            return InternalServerErrorResponse("An error occurred", ex);
        }
    }

    [HttpPut("{id}/Nationality/{nationalityId}")]
    [ServiceFilter(typeof(ValidationFilterAttribute))]
    public async Task<IActionResult> UpdateFamilyMemberNationality(int id, int nationalityId)
    {
        try
        {
            var existingMember = await _familyMemberServices.GetFamilyMemberByIdAsync(id);

            if (existingMember is null)
                return NotFoundResponse($"Family Member with ID#{id} not found in the database");

            existingMember.NationalityId = nationalityId;

            await _familyMemberServices.UpdateFamilyMemberAsync(existingMember);

            var response = _mapper.Map<FamilyMemberResponse>(existingMember);

            return Success(response);
        }
        catch (Exception ex)
        {
            return InternalServerErrorResponse("An error occurred", ex);
        }
    }

    #endregion

    #region DELETE

    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteFamilyMember(int id)
    {
        try
        {
            var existingMember = await _familyMemberServices.GetFamilyMemberByIdAsync(id);

            if (existingMember is null)
                return NotFoundResponse($"ID#{id} not found in the database");

            await _familyMemberServices.DeleteFamilyMemberAsync(id);

            return Ok();
        }
        catch (Exception ex)
        {
            return InternalServerErrorResponse("An error occured", ex);
        }
    }

    #endregion
}
