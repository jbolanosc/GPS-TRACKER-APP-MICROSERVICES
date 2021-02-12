using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using report_api.Models;
using Microsoft.AspNetCore.Cors;


namespace report_api.Controllers
{
    [EnableCors("CorsPolicy")]
    [Route("api/[controller]")]
    [ApiController]
    public class ReportController : ControllerBase
    {
        private readonly ReportContext _context;

        public ReportController(ReportContext context)
        {
            _context = context;
        }

        // GET /api/report
        [HttpGet]
        public ActionResult<IEnumerable<Report>> GetReportItems()
        {
            return _context.ReportItems;
        }

        [HttpGet("{id}")]
        public ActionResult<Report> GetReportItem(long id)
        {
            var report = _context.ReportItems.Find(id);

            if (report == null)
            {
                return NotFound();
            }
            return report;
        }

        [HttpPost]
        public ActionResult<Report> PostReportItem(Report report)
        {
            if (ModelState.IsValid)
            {
                _context.ReportItems.Add(report);
                _context.SaveChanges();

                return CreatedAtAction("GetReportItem", new Report { id = report.id }, report);
            }
            return BadRequest();
        }

        [HttpPut("{id}")]
        public ActionResult<Report> PutReportItem(long id, Report report)
        {

            if (id != report.id)
            {
                return BadRequest();
            }

            else if (ModelState.IsValid)
            {
                _context.Entry(report).State = EntityState.Modified;
                _context.SaveChanges();

                return report;
            }
            else
            {
                return BadRequest();
            }
        }

        [HttpDelete("{id}")]
        public ActionResult<Report> DeleteReport(long id)
        {
            var reportItem = _context.ReportItems.Find(id);

            if (reportItem == null)
            {
                return NotFound();
            }

            _context.ReportItems.Remove(reportItem);
            _context.SaveChanges();
            return reportItem;
        }


    }
}