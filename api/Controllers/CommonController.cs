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

[ApiController]
[Route("/api/")]
public class CommonController : ControllerBase
{
    private readonly INationalityService _nationalityService;
    private readonly IRelationshipService _relationshipService;
    private readonly IStudentService _studentService;
    private readonly IFamilyMemberServices _familyMemberServices;
    private readonly IMapper _mapper;

    public CommonController(
        INationalityService nationalityService,
        IRelationshipService relationshipService,
        IMapper mapper,
        ILogger<CommonController> logger
    )
    {
        _nationalityService = nationalityService;
        _relationshipService = relationshipService;
        _mapper = mapper;
    }

    #region GET

    [HttpGet("Nationalities")]
    public async Task<IActionResult> GetNationalityList()
    {
        var nationalities = await _nationalityService.GetAllAsync();

        return Ok(nationalities);
    }
    
    [HttpGet("Relationships")]
    public async Task<IActionResult> GetRelationshipList()
    {
        var relationships = await _relationshipService.GetAllAsync();

        return Ok(relationships);
    }

    #endregion

}
