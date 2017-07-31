using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace PASAROperations.Controllers
{
    public class RefineryController : Controller
    {
        //
        // GET: /Refinerycontroller/

        Models.PASAROperationEntities operationdb = new Models.PASAROperationEntities();

        public ActionResult RefineryTimelogs()
        {
            var ref_emp = (from crp in operationdb.REFTH_EmployeeRow select crp);
            SelectList emp_List = new SelectList(ref_emp, "REFTH_EmployeeRowId", "REFTH_RowNo");
            ViewData["emp_List"] = emp_List;
            return View();
        }
        public PartialViewResult RefineryCrewDefaults()
        {
            return PartialView();
        }
        public PartialViewResult RefineryProd()
        {
            return PartialView();
        }
        public PartialViewResult Refinery_Prod_Activity()
        {
            var ref_block = (from bl in operationdb.REFTH_Blocks select bl);
            SelectList blocks = new SelectList(ref_block, "REFTH_BlockId", "REFTH_BlockNo");
            ViewData["blocklist"] = blocks;
            ViewBag.timenow = DateTime.Now;
            return PartialView();
        }


        //----------------------------partial events---------------------------//
        public PartialViewResult refinerytimelog_tabs(string partialview_name)
        {

            if (partialview_name == "Refinery_manpower_electrolysis" || partialview_name == "Refinery_crew_electrolysis")
            {

                var roletype_result2 = (from rt in operationdb.REFTH_RoleType
                                        where rt.REFTH_RoleGroupId == 2
                                        orderby rt.REFTH_RoleTypeId ascending
                                        select rt).ToList();

                return PartialView(partialview_name, roletype_result2);

            }
            else
            {
                var roletype_result1 = (from rt in operationdb.REFTH_RoleType
                                        where rt.REFTH_RoleGroupId == 1
                                        orderby rt.REFTH_RoleTypeId ascending
                                        select rt).ToList();

                var param_result = (from rt in operationdb.REFTH_RoleType
                                    where rt.REFTH_RoleGroupId == 1
                                    orderby rt.REFTH_RoleTypeId ascending
                                    select rt).ToList();

                var ref_crop = (from crp in operationdb.REFTH_BlockPairs select crp);
                SelectList block_List = new SelectList(ref_crop, "REFTH_BlockPairId", "REFTH_BlockPair");
                ViewData["blockpairlist"] = block_List;
                var ref_block = (from bl in operationdb.REFTH_Blocks select bl);
                SelectList blocks = new SelectList(ref_block, "REFTH_BlockId", "REFTH_BlockNo");
                ViewData["blocklist"] = blocks;
                ViewBag.timenow = DateTime.Now;
                return PartialView(partialview_name, roletype_result1);
            }

        }

        public PartialViewResult load_refinery_add_activity()
        {

            @ViewBag.RefStartTime = DateTime.Now;

            return PartialView("Refinery_Add_Activity");
        }

        public PartialViewResult load_refinery_add_csmlog()
        {

            @ViewBag.RefStartTime = DateTime.Now;

            return PartialView("Refinery_Add_CSMlog");
        }
        public PartialViewResult load_refinery_add_crop()
        {
            var ref_crop = (from crp in operationdb.REFTH_BlockPairs select crp);
            SelectList block_List = new SelectList(ref_crop, "REFTH_BlockPairId", "REFTH_BlockPair");
            ViewData["blockpairlist"] = block_List;
            @ViewBag.RefStartTime = DateTime.Now;

            return PartialView("Refinery_cropshorts_add");
        }

        public ActionResult edit_cropshorts_data(int actid)
        {
            var editact = (from act in operationdb.VWREFTH_CROPS where act.REFTH_CropId == actid select act).First();

            ViewBag.starttime = editact.REFTH_DateStart == null ? default(DateTime) : editact.REFTH_DateStart;
            ViewBag.endtime = editact.REFTH_DateEnd == null ? default(DateTime) : editact.REFTH_DateEnd;
            ViewBag.REFTH_CropNo = editact.REFTH_CropNo;
            ViewBag.cropid = editact.REFTH_CropId;
            ViewBag.REFTH_ElapsedKAH = editact.REFTH_ElapsedKAH;


            var ref_crop = (from crp in operationdb.REFTH_BlockPairs select crp);
            SelectList block_List = new SelectList(ref_crop, "REFTH_BlockPairId", "REFTH_BlockPair", editact.REFTH_BlockPairId);
            ViewData["blockpairlist"] = block_List;


            return PartialView("Refinery_cropshorts_edit");

        }
        public PartialViewResult refinerytimelog_tabs_shorts(string partialview_name)
        {
            return PartialView(partialview_name);
        }
        public PartialViewResult load_popup_rppeditdate(int key_id, string monthyear)
        {
            if (operationdb.REFTH_ProdPlan_GetPrevMonth_SP(monthyear).Where(a => a.REFTH_BlockNo == key_id).Count() > 0)
            {
                //get default data time
                var ref_ppm = operationdb.REFTH_ProdPlan_GetPrevMonth_SP(monthyear).Where(a => a.REFTH_BlockNo == key_id).First();
                //Count with saved data time.              
                var ref_qry2 = (from crp in operationdb.VWREFTH_ProdPlanMonthData
                                where crp.REFTH_ExchangeDate.Year == ref_ppm.REFTH_ExchDate.Value.Year
                                    && crp.REFTH_ExchangeDate.Month == ref_ppm.REFTH_ExchDate.Value.Month
                                    && crp.REFTH_ExchangeDate.Day == ref_ppm.REFTH_ExchDate.Value.Day
                                    && crp.REFTH_BlockId == key_id
                                    && crp.REFTH_CropNo == ref_ppm.NewCrop
                                select crp).Count();

                if (ref_qry2 > 0)
                {
                    //get with saved data time
                    var ref_withdata = (from crp in operationdb.VWREFTH_ProdPlanMonthData
                                        where
                                            crp.REFTH_ExchangeDate.Year == ref_ppm.REFTH_ExchDate.Value.Year
                                            && crp.REFTH_ExchangeDate.Month == ref_ppm.REFTH_ExchDate.Value.Month
                                            && crp.REFTH_ExchangeDate.Day == ref_ppm.REFTH_ExchDate.Value.Day
                                            && crp.REFTH_BlockId == key_id && crp.REFTH_CropNo == ref_ppm.NewCrop
                                        select crp).First();

                    ViewBag.RefStartTime = ref_withdata.REFTH_KAHDate == null ? default(DateTime) : ref_withdata.REFTH_KAHDate;
                    ViewBag.key_id = key_id;
                    ViewBag.cropId = ref_withdata.REFTH_CropNo;
                    ViewBag.excdate = ref_withdata.REFTH_ExchangeDate;
                    ViewBag.REFTH_BlockPairId = ref_withdata.REFTH_BlockPairId;
                }
                else
                {

                    ViewBag.RefStartTime = ref_ppm.REFTH_ExchDate == null ? default(DateTime) : ref_ppm.REFTH_ExchDate;
                    ViewBag.key_id = key_id;
                    ViewBag.cropId = ref_ppm.NewCrop;
                    ViewBag.excdate = ref_ppm.REFTH_ExchDate;
                    ViewBag.REFTH_BlockPairId = ref_ppm.REFTH_BlockPairId;
                }

                return PartialView("Refinery_ProdplanMonthEditDate");
            }
            else
            {
                var ref_ppm = operationdb.REFTH_ProdPlan_GetPrevMonth_SP(monthyear).Where(a => a.REFTH_BlockNo == key_id).First();
                ViewBag.RefStartTime = DateTime.Now;
                ViewBag.key_id = key_id;
                ViewBag.cropId = ref_ppm.NewCrop;
                ViewBag.REFTH_BlockPairId = ref_ppm.REFTH_BlockPairId;
                return PartialView("Refinery_ProdplanMonthEditDate");
            }
        }

        public ActionResult edit_prodact_data(int actid)
        {
            var editact = (from act in operationdb.VWREFTH_ProductionData where act.REFTH_PPId == actid select act).First();

            ViewBag.starttime = editact.REFTH_ProductionStartDate == null ? default(DateTime) : editact.REFTH_ProductionStartDate;
            ViewBag.endtime = editact.REFTH_ProductionEndDate == null ? default(DateTime) : editact.REFTH_ProductionEndDate;
            ViewBag.REFTH_BlockId = editact.REFTH_BlockId;
            ViewBag.REFTH_PPcodeId = editact.REFTH_PPcodeId;
            ViewBag.REFTH_ActCode = editact.REFTH_ActCode;
            ViewBag.REFTH_PPId = editact.REFTH_PPId;
            ViewBag.REFTH_Remarks = editact.REFTH_Remarks;

            var ref_block = (from bl in operationdb.REFTH_Blocks select bl);
            SelectList blocks = new SelectList(ref_block, "REFTH_BlockId", "REFTH_BlockNo", editact.REFTH_BlockId);
            ViewData["blockpairlist"] = blocks;

            var activitycode_result = (from rp in operationdb.REFTH_PP_Actcode orderby rp.REFTH_ActCodeDesc ascending select rp).ToList();
            operationdb.Configuration.ProxyCreationEnabled = false;
            operationdb.Configuration.LazyLoadingEnabled = false;
            return PartialView("Refinery_prodact_edit", activitycode_result);
        }

        public PartialViewResult add_prodact_data(Nullable<int> key_id)
        {
            var ref_block = (from bl in operationdb.REFTH_Blocks select bl);
            SelectList blocks = new SelectList(ref_block, "REFTH_BlockId", "REFTH_BlockNo");
            ViewData["blockpairlist"] = blocks;
            @ViewBag.RefStartTime = DateTime.Now;
            @ViewBag.key_id = key_id;

            var activitycode_result = (from rp in operationdb.REFTH_PP_Actcode orderby rp.REFTH_ActCodeDesc ascending select rp).ToList();
            operationdb.Configuration.ProxyCreationEnabled = false;
            operationdb.Configuration.LazyLoadingEnabled = false;
            return PartialView("Refinery_prodact_add", activitycode_result);
        }

        public ActionResult edit_prodact_direct_data_(int key_id, DateTime sdate, Nullable<int> thisblock)
        {
            if (thisblock > 0)
            {
                var arr1 = (from act in operationdb.VWREFTH_ProductionData
                            where act.REFTH_ProductionStartDate.Year == sdate.Year && act.REFTH_ProductionStartDate.Month == sdate.Month &&
                 act.REFTH_ProductionStartDate.Day == sdate.Day && act.REFTH_BlockId == thisblock
                            select act);
                int i = 0;
                foreach (var item in arr1)
                {
                    if (i == key_id)
                    {
                        var myid = item.REFTH_PPId;
                        var editact = (from act in operationdb.VWREFTH_ProductionData where act.REFTH_PPId == myid select act).First();

                        ViewBag.starttime = editact.REFTH_ProductionStartDate == null ? default(DateTime) : editact.REFTH_ProductionStartDate;
                        ViewBag.endtime = editact.REFTH_ProductionEndDate == null ? default(DateTime) : editact.REFTH_ProductionEndDate;
                        ViewBag.REFTH_BlockId = editact.REFTH_BlockId;
                        ViewBag.REFTH_PPcodeId = editact.REFTH_PPcodeId;
                        ViewBag.REFTH_ActCode = editact.REFTH_ActCode;
                        ViewBag.REFTH_PPId = editact.REFTH_PPId;
                        ViewBag.REFTH_Remarks = editact.REFTH_Remarks;

                        var ref_block = (from bl in operationdb.REFTH_Blocks select bl);
                        SelectList blocks = new SelectList(ref_block, "REFTH_BlockId", "REFTH_BlockNo", editact.REFTH_BlockId);
                        ViewData["blockpairlist"] = blocks;
                    }
                    i++;
                }
                var activitycode_result = (from rp in operationdb.REFTH_PP_Actcode orderby rp.REFTH_ActCodeDesc ascending select rp).ToList();
                operationdb.Configuration.ProxyCreationEnabled = false;
                operationdb.Configuration.LazyLoadingEnabled = false;
                return PartialView("Refinery_prodact_edit", activitycode_result);
            }
            else
            {
                var arr2 = (from act in operationdb.VWREFTH_ProductionData
                            where act.REFTH_ProductionStartDate.Year == sdate.Year && act.REFTH_ProductionStartDate.Month == sdate.Month &&
                 act.REFTH_ProductionStartDate.Day == sdate.Day
                            select act);
                int i = 0;
                foreach (var item in arr2)
                {
                    if (i == key_id)
                    {
                        var myid = item.REFTH_PPId;
                        var editact = (from act in operationdb.VWREFTH_ProductionData where act.REFTH_PPId == myid select act).First();

                        ViewBag.starttime = editact.REFTH_ProductionStartDate == null ? default(DateTime) : editact.REFTH_ProductionStartDate;
                        ViewBag.endtime = editact.REFTH_ProductionEndDate == null ? default(DateTime) : editact.REFTH_ProductionEndDate;
                        ViewBag.REFTH_BlockId = editact.REFTH_BlockId;
                        ViewBag.REFTH_PPcodeId = editact.REFTH_PPcodeId;
                        ViewBag.REFTH_ActCode = editact.REFTH_ActCode;
                        ViewBag.REFTH_PPId = editact.REFTH_PPId;
                        ViewBag.REFTH_Remarks = editact.REFTH_Remarks;

                        var ref_block = (from bl in operationdb.REFTH_Blocks select bl);
                        SelectList blocks = new SelectList(ref_block, "REFTH_BlockId", "REFTH_BlockNo", editact.REFTH_BlockId);
                        ViewData["blockpairlist"] = blocks;
                    }
                    i++;
                }
                var activitycode_result = (from rp in operationdb.REFTH_PP_Actcode orderby rp.REFTH_ActCodeDesc ascending select rp).ToList();
                operationdb.Configuration.ProxyCreationEnabled = false;
                operationdb.Configuration.LazyLoadingEnabled = false;
                return PartialView("Refinery_prodact_edit", activitycode_result);
            }
        }

        //To load data in add Dialog for graph production plan daily 
        public PartialViewResult add_prodact_datadirect(Nullable<int> key_id, DateTime rpp_daily_date)
        {
            var ref_block = (from bl in operationdb.REFTH_Blocks select bl);
            SelectList blocks = new SelectList(ref_block, "REFTH_BlockId", "REFTH_BlockNo");
            ViewData["blockpairlist"] = blocks;

            @ViewBag.RefStartTime = rpp_daily_date;
            @ViewBag.key_id = key_id;

            var ref_streams = (from bl in operationdb.REFTH_PP_Streams select bl);
            SelectList streams = new SelectList(ref_streams, "REFTH_PPstreamId", "REFTH_Streamname");
            ViewData["streamslist"] = streams;

            var activitycode_result = (from rp in operationdb.REFTH_PP_Actcode orderby rp.REFTH_ActCodeDesc ascending select rp).ToList();
            operationdb.Configuration.ProxyCreationEnabled = false;
            operationdb.Configuration.LazyLoadingEnabled = false;
            return PartialView("Refinery_prodact_add", activitycode_result);
        }

        //To load data in edit Dialog for graph production plan daily 
        public ActionResult edit_prodact_direct_data_duration(int key_id, DateTime sdate, Nullable<int> thisblock, Nullable<int> streamid)
        {

            //if thisblock is has value select data in REFTH_PPDaily_Temp_Table_block
            if (thisblock > 0)
            {
                int i = 0;
                foreach (var item in operationdb.REFTH_PPDaily_Temp_Table_block.Where(a => a.REFTH_Proddate == sdate))
                {
                    if (i == key_id)
                    {
                        var myid = item.REFTH_PPId;
                        var editact = operationdb.REFTH_PPDaily_Temp_Table_block.Where(a => a.REFTH_PPId == myid).First();

                        ViewBag.starttime = editact.StartTime == null ? default(DateTime) : editact.StartTime;
                        ViewBag.endtime = editact.EndTime == null ? default(DateTime) : editact.EndTime;
                        ViewBag.REFTH_BlockId = editact.REFTH_BlockId;
                        ViewBag.REFTH_PPcodeId = editact.REFTH_PPcodeId;
                        ViewBag.REFTH_ActCode = editact.REFTH_ActCode;
                        ViewBag.REFTH_PPId = editact.REFTH_PPId;
                        ViewBag.REFTH_Remarks = editact.REFTH_Remarks;
                        ViewBag.REFTH_ActDuration = editact.REFTH_ActDuration;
                        ViewBag.REFTH_Flag = editact.REFTH_Flag;
                        ViewBag.REFTH_PPstreamId = editact.REFTH_PPstreamId;
                        ViewBag.REFTH_Streamname = editact.REFTH_Streamname;

                        var ref_block = (from bl in operationdb.REFTH_Blocks select bl);
                        SelectList blocks = new SelectList(ref_block, "REFTH_BlockId", "REFTH_BlockNo", editact.REFTH_BlockId);
                        ViewData["blockpairlist"] = blocks;
                    }
                    i++;
                }
                var activitycode_result = (from rp in operationdb.REFTH_PP_Actcode orderby rp.REFTH_ActCodeDesc ascending select rp).ToList();
                operationdb.Configuration.ProxyCreationEnabled = false;
                operationdb.Configuration.LazyLoadingEnabled = false;
                return PartialView("Refinery_prodact_edit", activitycode_result);
            }

            //if stream is has value select data in REFTH_PPDaily_Temp_Table_stream
            else if (streamid > 0)
            {
                int i = 0;
                foreach (var item in operationdb.REFTH_PPDaily_Temp_Table_stream.Where(a => a.REFTH_Proddate == sdate))
                {
                    if (i == key_id)
                    {
                        var myid = item.REFTH_PPId;
                        var editact = operationdb.REFTH_PPDaily_Temp_Table_stream.Where(a => a.REFTH_PPId == myid).First();

                        ViewBag.starttime = editact.StartTime == null ? default(DateTime) : editact.StartTime;
                        ViewBag.endtime = editact.EndTime == null ? default(DateTime) : editact.EndTime;
                        ViewBag.REFTH_BlockId = editact.REFTH_BlockId;
                        ViewBag.REFTH_PPcodeId = editact.REFTH_PPcodeId;
                        ViewBag.REFTH_ActCode = editact.REFTH_ActCode;
                        ViewBag.REFTH_PPId = editact.REFTH_PPId;
                        ViewBag.REFTH_Remarks = editact.REFTH_Remarks;
                        ViewBag.REFTH_ActDuration = editact.REFTH_ActDuration;
                        ViewBag.REFTH_Flag = editact.REFTH_Flag;
                        ViewBag.REFTH_PPstreamId = editact.REFTH_PPstreamId;
                        ViewBag.REFTH_Streamname = editact.REFTH_Streamname;

                        var ref_block = (from bl in operationdb.REFTH_Blocks select bl);
                        SelectList blocks = new SelectList(ref_block, "REFTH_BlockId", "REFTH_BlockNo", editact.REFTH_BlockId);
                        ViewData["blockpairlist"] = blocks;
                    }
                    i++;
                }
                var activitycode_result = (from rp in operationdb.REFTH_PP_Actcode orderby rp.REFTH_ActCodeDesc ascending select rp).ToList();
                operationdb.Configuration.ProxyCreationEnabled = false;
                operationdb.Configuration.LazyLoadingEnabled = false;
                return PartialView("Refinery_prodact_edit", activitycode_result);
            }

            //if stream and block is has no value select data in REFTH_PPDaily_Temp_Table
            else
            {
                int i = 0;
                foreach (var item in operationdb.REFTH_PPDaily_Temp_Table.Where(a => a.REFTH_Proddate == sdate))
                {
                    if (i == key_id)
                    {
                        var myid = item.REFTH_PPId;
                        var editact = operationdb.REFTH_PPDaily_Temp_Table.Where(a => a.REFTH_PPId == myid).First();

                        ViewBag.starttime = editact.StartTime == null ? default(DateTime) : editact.StartTime;
                        ViewBag.endtime = editact.EndTime == null ? default(DateTime) : editact.EndTime;
                        ViewBag.REFTH_BlockId = editact.REFTH_BlockId;
                        ViewBag.REFTH_PPcodeId = editact.REFTH_PPcodeId;
                        ViewBag.REFTH_ActCode = editact.REFTH_ActCode;
                        ViewBag.REFTH_PPId = editact.REFTH_PPId;
                        ViewBag.REFTH_Remarks = editact.REFTH_Remarks;
                        ViewBag.REFTH_ActDuration = editact.REFTH_ActDuration;
                        ViewBag.REFTH_Flag = editact.REFTH_Flag;
                        ViewBag.REFTH_PPstreamId = editact.REFTH_PPstreamId;
                        ViewBag.REFTH_Streamname = editact.REFTH_Streamname;

                        var ref_block = (from bl in operationdb.REFTH_Blocks select bl);
                        SelectList blocks = new SelectList(ref_block, "REFTH_BlockId", "REFTH_BlockNo", editact.REFTH_BlockId);
                        ViewData["blockpairlist"] = blocks;
                    }
                    i++;
                }
                var activitycode_result = (from rp in operationdb.REFTH_PP_Actcode orderby rp.REFTH_ActCodeDesc ascending select rp).ToList();
                operationdb.Configuration.ProxyCreationEnabled = false;
                operationdb.Configuration.LazyLoadingEnabled = false;
                return PartialView("Refinery_prodact_edit", activitycode_result);

            }
        }

        //To load data insert Dialog for graph production plan daily 
        public ActionResult edit_prod_insert_data_duration(int key_id, DateTime sdate, Nullable<int> thisblock, Nullable<int> streamid)
        {
            if (thisblock > 0)
            {
                int i = 0;
                foreach (var item in operationdb.REFTH_PPDaily_Temp_Table_block.Where(a => a.REFTH_Proddate == sdate))
                {
                    if (i == key_id)
                    {
                        var myid = item.REFTH_PPId;
                        var editact = operationdb.REFTH_PPDaily_Temp_Table_block.Where(a => a.REFTH_PPId == myid).First();

                        ViewBag.starttime = editact.EndTime == null ? default(DateTime) : editact.EndTime;
                        ViewBag.endtime = editact.EndTime == null ? default(DateTime) : editact.EndTime;
                        ViewBag.REFTH_BlockId = editact.REFTH_BlockId;
                        ViewBag.REFTH_PPcodeId = editact.REFTH_PPcodeId;
                        ViewBag.REFTH_ActCode = editact.REFTH_ActCode;
                        ViewBag.REFTH_PPId = editact.REFTH_PPId;
                        ViewBag.REFTH_Remarks = editact.REFTH_Remarks;
                        ViewBag.REFTH_ActDuration = editact.REFTH_ActDuration;
                        ViewBag.REFTH_Flag = editact.REFTH_Flag;
                        ViewBag.REFTH_PPstreamId = editact.REFTH_PPstreamId;
                        ViewBag.REFTH_Streamname = editact.REFTH_Streamname;

                        var ref_streams = (from bl in operationdb.REFTH_PP_Streams select bl);
                        SelectList streams = new SelectList(ref_streams, "REFTH_PPstreamId", "REFTH_Streamname", editact.REFTH_PPstreamId);
                        ViewData["streamslist"] = streams;

                        var ref_block = (from bl in operationdb.REFTH_Blocks select bl);
                        SelectList blocks = new SelectList(ref_block, "REFTH_BlockId", "REFTH_BlockNo", editact.REFTH_BlockId);
                        ViewData["blockpairlist"] = blocks;
                    }
                    i++;
                }
                var activitycode_result = (from rp in operationdb.REFTH_PP_Actcode orderby rp.REFTH_ActCodeDesc ascending select rp).ToList();
                operationdb.Configuration.ProxyCreationEnabled = false;
                operationdb.Configuration.LazyLoadingEnabled = false;
                return PartialView("Refinery_prodact_insert", activitycode_result);
            }
            else if (streamid > 0)
            {
                int i = 0;
                foreach (var item in operationdb.REFTH_PPDaily_Temp_Table_stream.Where(a => a.REFTH_Proddate == sdate))
                {
                    if (i == key_id)
                    {
                        var myid = item.REFTH_PPId;
                        var editact = operationdb.REFTH_PPDaily_Temp_Table_stream.Where(a => a.REFTH_PPId == myid).First();

                        ViewBag.starttime = editact.EndTime == null ? default(DateTime) : editact.EndTime;
                        ViewBag.endtime = editact.EndTime == null ? default(DateTime) : editact.EndTime;
                        ViewBag.REFTH_BlockId = editact.REFTH_BlockId;
                        ViewBag.REFTH_PPcodeId = editact.REFTH_PPcodeId;
                        ViewBag.REFTH_ActCode = editact.REFTH_ActCode;
                        ViewBag.REFTH_PPId = editact.REFTH_PPId;
                        ViewBag.REFTH_Remarks = editact.REFTH_Remarks;
                        ViewBag.REFTH_ActDuration = editact.REFTH_ActDuration;
                        ViewBag.REFTH_Flag = editact.REFTH_Flag;
                        ViewBag.REFTH_PPstreamId = editact.REFTH_PPstreamId;
                        ViewBag.REFTH_Streamname = editact.REFTH_Streamname;

                        var ref_streams = (from bl in operationdb.REFTH_PP_Streams select bl);
                        SelectList streams = new SelectList(ref_streams, "REFTH_PPstreamId", "REFTH_Streamname", editact.REFTH_PPstreamId);
                        ViewData["streamslist"] = streams;


                        var ref_block = (from bl in operationdb.REFTH_Blocks select bl);
                        SelectList blocks = new SelectList(ref_block, "REFTH_BlockId", "REFTH_BlockNo", editact.REFTH_BlockId);
                        ViewData["blockpairlist"] = blocks;
                    }
                    i++;
                }
                var activitycode_result = (from rp in operationdb.REFTH_PP_Actcode orderby rp.REFTH_ActCodeDesc ascending select rp).ToList();
                operationdb.Configuration.ProxyCreationEnabled = false;
                operationdb.Configuration.LazyLoadingEnabled = false;
                return PartialView("Refinery_prodact_insert", activitycode_result);
            }
            else
            {
                int i = 0;
                foreach (var item in operationdb.REFTH_PPDaily_Temp_Table.Where(a => a.REFTH_Proddate == sdate))
                {
                    if (i == key_id)
                    {
                        var myid = item.REFTH_PPId;
                        var editact = operationdb.REFTH_PPDaily_Temp_Table.Where(a => a.REFTH_PPId == myid).First();

                        ViewBag.starttime = editact.EndTime == null ? default(DateTime) : editact.EndTime;
                        ViewBag.endtime = editact.EndTime == null ? default(DateTime) : editact.EndTime;
                        ViewBag.REFTH_BlockId = editact.REFTH_BlockId;
                        ViewBag.REFTH_PPcodeId = editact.REFTH_PPcodeId;
                        ViewBag.REFTH_ActCode = editact.REFTH_ActCode;
                        ViewBag.REFTH_PPId = editact.REFTH_PPId;
                        ViewBag.REFTH_Remarks = editact.REFTH_Remarks;
                        ViewBag.REFTH_ActDuration = editact.REFTH_ActDuration;
                        ViewBag.REFTH_Flag = editact.REFTH_Flag;
                        ViewBag.REFTH_PPstreamId = editact.REFTH_PPstreamId;
                        ViewBag.REFTH_Streamname = editact.REFTH_Streamname;

                        var ref_block = (from bl in operationdb.REFTH_Blocks select bl);
                        SelectList blocks = new SelectList(ref_block, "REFTH_BlockId", "REFTH_BlockNo", editact.REFTH_BlockId);
                        ViewData["blockpairlist"] = blocks;

                        var ref_strms = (from bl in operationdb.REFTH_PP_Streams select bl);
                        SelectList strms = new SelectList(ref_strms, "REFTH_PPstreamId", "REFTH_Streamname", editact.REFTH_PPstreamId);
                        ViewData["streamslist"] = strms;

                    }
                    i++;
                }
                var activitycode_result = (from rp in operationdb.REFTH_PP_Actcode orderby rp.REFTH_ActCodeDesc ascending select rp).ToList();
                operationdb.Configuration.ProxyCreationEnabled = false;
                operationdb.Configuration.LazyLoadingEnabled = false;
                return PartialView("Refinery_prodact_insert", activitycode_result);
            }

        }

        public PartialViewResult load_Refinery_prodact_option(int key_id, DateTime sdate, Nullable<int> thisblock)
        {
            ViewBag.key_id = key_id;
            return PartialView("Refinery_prodact_option");
        }

        public PartialViewResult ddactive_rpp_month(string partialview_name)
        {
            var param_result = (from rt in operationdb.REFTH_Param
                                select rt).ToList();

            var ref_crop = (from crp in operationdb.REFTH_BlockPairs select crp);
            SelectList block_List = new SelectList(ref_crop, "REFTH_BlockPairId", "REFTH_BlockPair");
            ViewData["blockpairlist"] = block_List;

            var ref_block = (from bl in operationdb.REFTH_Blocks select bl);
            SelectList blocks = new SelectList(ref_block, "REFTH_BlockId", "REFTH_BlockNo");
            ViewData["blocklist"] = blocks;

            var ref_streams = (from bl in operationdb.REFTH_PP_Streams select bl);
            SelectList streams = new SelectList(ref_streams, "REFTH_PPstreamId", "REFTH_Streamname");
            ViewData["streamslist"] = streams;

            ViewBag.timenow = default(DateTime);
            return PartialView(partialview_name, param_result);


        }

        public PartialViewResult add_prodact_datadirect_plan(Nullable<int> key_id, DateTime rpp_daily_date)
        {
            var ref_block = (from bl in operationdb.REFTH_Blocks select bl);
            SelectList blocks = new SelectList(ref_block, "REFTH_BlockId", "REFTH_BlockNo");
            ViewData["blockpairlist"] = blocks;
            @ViewBag.RefStartTime = rpp_daily_date;
            @ViewBag.key_id = key_id;

            var activitycode_result = (from rp in operationdb.REFTH_PP_Actcode orderby rp.REFTH_ActCodeDesc ascending select rp).ToList();
            operationdb.Configuration.ProxyCreationEnabled = false;
            operationdb.Configuration.LazyLoadingEnabled = false;
            return PartialView("Refinery_prodact_add_plan", activitycode_result);
        }

        public PartialViewResult load_Refinery_prodact_option_plan(int key_id, DateTime sdate, Nullable<int> thisblock)
        {
            ViewBag.key_id = key_id;
            return PartialView("Refinery_prodact_option_plan");
        }

        public ActionResult edit_prod_insert_data_duration_plan(int key_id, DateTime sdate, Nullable<int> thisblock)
        {
            if (thisblock > 0)
            {
                int i = 0;
                foreach (var item in operationdb.REFTH_PRODACTIVITY_LOAD_PERBLOCK_PLAN(thisblock, sdate))
                {
                    if (i == key_id)
                    {
                        var myid = item.REFTH_PPId;
                        var editact = operationdb.REFTH_PRODACTIVITY_LOAD_PERBLOCK_PLAN(thisblock, sdate).Where(a => a.REFTH_PPId == myid).First();

                        ViewBag.starttime = editact.EndTime == null ? default(DateTime) : editact.EndTime;
                        ViewBag.endtime = editact.EndTime == null ? default(DateTime) : editact.EndTime;
                        ViewBag.REFTH_BlockId = editact.REFTH_BlockId;
                        ViewBag.REFTH_PPcodeId = editact.REFTH_PPcodeId;
                        ViewBag.REFTH_ActCode = editact.REFTH_ActCode;
                        ViewBag.REFTH_PPId = editact.REFTH_PPId;
                        ViewBag.REFTH_Remarks = editact.REFTH_Remarks;
                        ViewBag.REFTH_ActDuration = editact.REFTH_ActDuration;

                        var ref_block = (from bl in operationdb.REFTH_Blocks select bl);
                        SelectList blocks = new SelectList(ref_block, "REFTH_BlockId", "REFTH_BlockNo", editact.REFTH_BlockId);
                        ViewData["blockpairlist"] = blocks;
                    }
                    i++;
                }
                var activitycode_result = (from rp in operationdb.REFTH_PP_Actcode orderby rp.REFTH_ActCodeDesc ascending select rp).ToList();
                operationdb.Configuration.ProxyCreationEnabled = false;
                operationdb.Configuration.LazyLoadingEnabled = false;
                return PartialView("Refinery_prodact_insert", activitycode_result);
            }
            else
            {
                int i = 0;
                foreach (var item in operationdb.REFTH_PPDaily_Temp_Table_plan.Where(a => a.REFTH_Proddate == sdate))
                {
                    if (i == key_id)
                    {
                        var myid = item.REFTH_PPId;
                        var editact = operationdb.REFTH_PPDaily_Temp_Table_plan.Where(a => a.REFTH_PPId == myid).First();

                        ViewBag.starttime = editact.EndTime == null ? default(DateTime) : editact.EndTime;
                        ViewBag.endtime = editact.EndTime == null ? default(DateTime) : editact.EndTime;
                        ViewBag.REFTH_BlockId = editact.REFTH_BlockId;
                        ViewBag.REFTH_PPcodeId = editact.REFTH_PPcodeId;
                        ViewBag.REFTH_ActCode = editact.REFTH_ActCode;
                        ViewBag.REFTH_PPId = editact.REFTH_PPId;
                        ViewBag.REFTH_Remarks = editact.REFTH_Remarks;
                        ViewBag.REFTH_ActDuration = editact.REFTH_ActDuration;

                        var ref_block = (from bl in operationdb.REFTH_Blocks select bl);
                        SelectList blocks = new SelectList(ref_block, "REFTH_BlockId", "REFTH_BlockNo", editact.REFTH_BlockId);
                        ViewData["blockpairlist"] = blocks;
                    }
                    i++;
                }
                var activitycode_result = (from rp in operationdb.REFTH_PP_Actcode orderby rp.REFTH_ActCodeDesc ascending select rp).ToList();
                operationdb.Configuration.ProxyCreationEnabled = false;
                operationdb.Configuration.LazyLoadingEnabled = false;
                return PartialView("Refinery_prodact_insert_plan", activitycode_result);
            }
        }

        public ActionResult edit_prodact_direct_data_duration_plan(int key_id, DateTime sdate, Nullable<int> thisblock)
        {
            if (thisblock > 0)
            {
                int i = 0;
                foreach (var item in operationdb.REFTH_PRODACTIVITY_LOAD_PERBLOCK_PLAN(thisblock, sdate))
                {
                    if (i == key_id)
                    {
                        var myid = item.REFTH_PPId;
                        var editact = operationdb.REFTH_PRODACTIVITY_LOAD_PERBLOCK_PLAN(thisblock, sdate).Where(a => a.REFTH_PPId == myid).First();

                        ViewBag.starttime = editact.StartTime == null ? default(DateTime) : editact.StartTime;
                        ViewBag.endtime = editact.EndTime == null ? default(DateTime) : editact.EndTime;
                        ViewBag.REFTH_BlockId = editact.REFTH_BlockId;
                        ViewBag.REFTH_PPcodeId = editact.REFTH_PPcodeId;
                        ViewBag.REFTH_ActCode = editact.REFTH_ActCode;
                        ViewBag.REFTH_PPId = editact.REFTH_PPId;
                        ViewBag.REFTH_Remarks = editact.REFTH_Remarks;
                        ViewBag.REFTH_ActDuration = editact.REFTH_ActDuration;

                        var ref_block = (from bl in operationdb.REFTH_Blocks select bl);
                        SelectList blocks = new SelectList(ref_block, "REFTH_BlockId", "REFTH_BlockNo", editact.REFTH_BlockId);
                        ViewData["blockpairlist"] = blocks;
                    }
                    i++;
                }
                var activitycode_result = (from rp in operationdb.REFTH_PP_Actcode orderby rp.REFTH_ActCodeDesc ascending select rp).ToList();
                operationdb.Configuration.ProxyCreationEnabled = false;
                operationdb.Configuration.LazyLoadingEnabled = false;
                return PartialView("Refinery_prodact_edit_plan", activitycode_result);
            }
            else
            {
                int i = 0;
                foreach (var item in operationdb.REFTH_PPDaily_Temp_Table_plan.Where(a => a.REFTH_Proddate == sdate))
                {
                    if (i == key_id)
                    {
                        var myid = item.REFTH_PPId;
                        var editact = operationdb.REFTH_PPDaily_Temp_Table_plan.Where(a => a.REFTH_PPId == myid).First();

                        ViewBag.starttime = editact.StartTime == null ? default(DateTime) : editact.StartTime;
                        ViewBag.endtime = editact.EndTime == null ? default(DateTime) : editact.EndTime;
                        ViewBag.REFTH_BlockId = editact.REFTH_BlockId;
                        ViewBag.REFTH_PPcodeId = editact.REFTH_PPcodeId;
                        ViewBag.REFTH_ActCode = editact.REFTH_ActCode;
                        ViewBag.REFTH_PPId = editact.REFTH_PPId;
                        ViewBag.REFTH_Remarks = editact.REFTH_Remarks;
                        ViewBag.REFTH_ActDuration = editact.REFTH_ActDuration;

                        var ref_block = (from bl in operationdb.REFTH_Blocks select bl);
                        SelectList blocks = new SelectList(ref_block, "REFTH_BlockId", "REFTH_BlockNo", editact.REFTH_BlockId);
                        ViewData["blockpairlist"] = blocks;
                    }
                    i++;
                }
                var activitycode_result = (from rp in operationdb.REFTH_PP_Actcode orderby rp.REFTH_ActCodeDesc ascending select rp).ToList();
                operationdb.Configuration.ProxyCreationEnabled = false;
                operationdb.Configuration.LazyLoadingEnabled = false;
                return PartialView("Refinery_prodact_edit_plan", activitycode_result);
            }
        }

        //To load data in add Dialog for graph production plan daily no restrict
        public PartialViewResult add_prodact_add_restrict(Nullable<int> key_id, DateTime rpp_daily_date)
        {
            var ref_block = (from bl in operationdb.REFTH_Blocks select bl);
            SelectList blocks = new SelectList(ref_block, "REFTH_BlockId", "REFTH_BlockNo");
            ViewData["blockpairlist"] = blocks;

            @ViewBag.RefStartTime = rpp_daily_date;
            @ViewBag.key_id = key_id;

            var ref_streams = (from bl in operationdb.REFTH_PP_Streams select bl);
            SelectList streams = new SelectList(ref_streams, "REFTH_PPstreamId", "REFTH_Streamname");
            ViewData["streamslist"] = streams;

            var activitycode_result = (from rp in operationdb.REFTH_PP_Actcode orderby rp.REFTH_ActCodeDesc ascending select rp).ToList();
            operationdb.Configuration.ProxyCreationEnabled = false;
            operationdb.Configuration.LazyLoadingEnabled = false;
            return PartialView("Refinery_prodact_add_restrict", activitycode_result);
        }

        //To load data in edit Dialog for graph production plan daily no restrict
        public ActionResult edit_prodact_data_restrict(int actid)
        {
            var editact = (from act in operationdb.VWREFTH_ProductionData where act.REFTH_PPId == actid select act).First();

            ViewBag.starttime = editact.REFTH_ProductionStartDate == null ? default(DateTime) : editact.REFTH_ProductionStartDate;
            ViewBag.endtime = editact.REFTH_ProductionEndDate == null ? default(DateTime) : editact.REFTH_ProductionEndDate;
            ViewBag.REFTH_BlockId = editact.REFTH_BlockId;
            ViewBag.REFTH_PPcodeId = editact.REFTH_PPcodeId;
            ViewBag.REFTH_ActCode = editact.REFTH_ActCode;
            ViewBag.REFTH_PPId = editact.REFTH_PPId;
            ViewBag.REFTH_Remarks = editact.REFTH_Remarks;
            ViewBag.REFTH_ActDuration = editact.REFTH_ActDuration;
            ViewBag.REFTH_Flag = editact.REFTH_Flag;
            ViewBag.REFTH_PPstreamId = editact.REFTH_PPstreamId;
            ViewBag.REFTH_Streamname = editact.REFTH_Streamname;

            var ref_block = (from bl in operationdb.REFTH_Blocks select bl);
            SelectList blocks = new SelectList(ref_block, "REFTH_BlockId", "REFTH_BlockNo", editact.REFTH_BlockId);
            ViewData["blockpairlist"] = blocks;

            var activitycode_result = (from rp in operationdb.REFTH_PP_Actcode orderby rp.REFTH_ActCodeDesc ascending select rp).ToList();
            operationdb.Configuration.ProxyCreationEnabled = false;
            operationdb.Configuration.LazyLoadingEnabled = false;
            return PartialView("Refinery_prodact_edit_restrict", activitycode_result);
        }
        
        //-----------------------load_data events----------------------------------//

        public JsonResult load_ref_employee(int deptid)
        {

            var emp_result1 = (from er in operationdb.VWREFTH_Employee where er.DepartmentId == deptid orderby er.Fullname ascending select new { EmployeeId = er.EmployeeId, Fullname = er.Fullname });

            operationdb.Configuration.ProxyCreationEnabled = false;
            operationdb.Configuration.LazyLoadingEnabled = false;
            return Json(emp_result1, JsonRequestBehavior.AllowGet);

        }

        public JsonResult load_ref_shorts_row(int row_emp)
        {

            var select_rows = (from bl in operationdb.VWREF_ActiveBlocks where bl.REFTH_RowId == row_emp select bl);

            operationdb.Configuration.ProxyCreationEnabled = false;
            operationdb.Configuration.LazyLoadingEnabled = false;

            return Json(select_rows, JsonRequestBehavior.AllowGet);
        }

        public JsonResult load_ref_manpower_data(DateTime proddate, int shiftId, int rolegroup)
        {
            var select_val = (from rm in operationdb.VWREFTH_Manpower where rm.REFTH_ProductionDate == proddate && rm.REFTH_ShiftId == shiftId && rm.REFTH_RoleGroup_Id == rolegroup select rm);

            operationdb.Configuration.ProxyCreationEnabled = false;
            operationdb.Configuration.LazyLoadingEnabled = false;

            return Json(select_val, JsonRequestBehavior.AllowGet);
        }

        public JsonResult load_crew_select()
        {
            var select_val = (from cs in operationdb.REFTH_Crew select cs);

            operationdb.Configuration.ProxyCreationEnabled = false;
            operationdb.Configuration.LazyLoadingEnabled = false;

            return Json(select_val, JsonRequestBehavior.AllowGet);

        }

        public JsonResult load_ref_default_manpower(int default_crew)
        {
            var select_default = (from rm in operationdb.VWREFTH_DefaultCrew where rm.REFTH_CrewId == default_crew select rm);

            operationdb.Configuration.ProxyCreationEnabled = false;
            operationdb.Configuration.LazyLoadingEnabled = false;

            return Json(select_default, JsonRequestBehavior.AllowGet);
        }

        public JsonResult load_ref_crewlist_manpower(int default_crew)
        {
            var select_val = (from rm in operationdb.VWREFTH_DefaultCrew where rm.REFTH_CrewId == default_crew select rm);

            operationdb.Configuration.ProxyCreationEnabled = false;
            operationdb.Configuration.LazyLoadingEnabled = false;

            return Json(select_val, JsonRequestBehavior.AllowGet);
        }

        public JsonResult ref_load_shorts_employeerow()
        {
            var query_row = (from qr in operationdb.VWREFTH_EmployeeRow select qr);

            operationdb.Configuration.ProxyCreationEnabled = false;
            operationdb.Configuration.LazyLoadingEnabled = false;

            return Json(query_row, JsonRequestBehavior.AllowGet);
        }

        public JsonResult ref_shorts_load_data(DateTime proddate, int shiftId, int row_emp)
        {
            var query_row = (from qr in operationdb.VWREFTH_Shorts where qr.REFTH_ProductionDate == proddate && qr.REFTH_ShiftId == shiftId && qr.REFTH_RowNo == row_emp select qr);

            operationdb.Configuration.ProxyCreationEnabled = false;
            operationdb.Configuration.LazyLoadingEnabled = false;

            return Json(query_row, JsonRequestBehavior.AllowGet);
        }

        public JsonResult ref_shorts_Crop_load_data(DateTime proddate, int shiftId, int row_emp)
        {
            var query_row = (from qr in operationdb.VWREFTH_Shorts_Crop where qr.REFTH_ProductionDate == proddate && qr.REFTH_ShiftId == shiftId && qr.REFTH_RowNo == row_emp select qr);

            operationdb.Configuration.ProxyCreationEnabled = false;
            operationdb.Configuration.LazyLoadingEnabled = false;

            return Json(query_row, JsonRequestBehavior.AllowGet);
        }

        public JsonResult load_data_ref_crop(string date, int iMonth, int iYear)
        {
            var currMonth = iMonth + 1;
            var query_crop = from crp in operationdb.VWREFTH_CROPS where (crp.REFTH_DateStart.Month == currMonth && crp.REFTH_DateStart.Year == iYear) || (crp.REFTH_DateStart.Month == iMonth && crp.REFTH_DateStart.Year == iYear) orderby crp.REFTH_CropId descending select crp;
            return Json(query_crop, JsonRequestBehavior.AllowGet);

        }

        public JsonResult load_data_ref_crop_nofilter()
        {
            var query_crop = from crp in operationdb.VWREFTH_CROPS orderby crp.REFTH_DateStart ascending select crp;
            return Json(query_crop, JsonRequestBehavior.AllowGet);

        }

        public JsonResult load_data_ref_crop_sdate(DateTime sdate, int blockid, string monthyear, int iMonth, int iYear)
        {
            var currMonth = iMonth + 1;
            var query_crop = from crp in operationdb.VWREFTH_CROPS
                             where (crp.REFTH_DateStart.Month == currMonth && crp.REFTH_DateStart.Year == iYear)
                             || (crp.REFTH_DateStart.Month == iMonth && crp.REFTH_DateStart.Year == iYear)
                             orderby crp.REFTH_CropId descending
                             select crp;

            var qry2 = query_crop.Where(a => a.REFTH_BlockPairId == blockid && a.REFTH_DateStart.Year == sdate.Year && a.REFTH_DateStart.Month == sdate.Month
                                 && a.REFTH_DateStart.Day == sdate.Day);

            return Json(qry2, JsonRequestBehavior.AllowGet);
        }

        public JsonResult load_data_ref_crop_block(int blockid, string monthyear, int iMonth, int iYear)
        {
            var currMonth = iMonth + 1;
            var query_crop = from crp in operationdb.VWREFTH_CROPS
                             where (crp.REFTH_DateStart.Month == currMonth && crp.REFTH_DateStart.Year == iYear)
                             || (crp.REFTH_DateStart.Month == iMonth && crp.REFTH_DateStart.Year == iYear)
                             orderby crp.REFTH_CropId descending
                             select crp;

            var qry2 = query_crop.Where(a => a.REFTH_BlockPairId == blockid);


            return Json(qry2, JsonRequestBehavior.AllowGet);
        }

        public JsonResult load_block_prod_plan_month()
        {
            var query_crop = from crp in operationdb.REFTH_Blocks orderby crp.REFTH_BlockId select crp;
            operationdb.Configuration.ProxyCreationEnabled = false;
            operationdb.Configuration.LazyLoadingEnabled = false;
            return Json(query_crop, JsonRequestBehavior.AllowGet);
        }

        public JsonResult load_data_prod_plan_month(string monthyear)
        {
            var query_crop = from crp in operationdb.VWREFTH_ProdPlanMonth where crp.MonthYear == monthyear orderby crp.REFTH_BlockPairId select crp;
            operationdb.Configuration.ProxyCreationEnabled = false;
            operationdb.Configuration.LazyLoadingEnabled = false;
            return Json(query_crop, JsonRequestBehavior.AllowGet);
        }

        public JsonResult Refinery_ActivityCode(string actcode_param)
        {

            var ActCode_i = (from rp in operationdb.REFTH_PP_Actcode where rp.REFTH_ActCode == actcode_param select new { rp.REFTH_ActCodeDesc, rp.REFTH_PPcodeId, rp.REFTH_ActCode, rp.REFTH_Style_Color }).FirstOrDefault();

            return Json(ActCode_i, JsonRequestBehavior.AllowGet);
        }

        public JsonResult load_data_prod_act()
        {
            var query_crop = from crp in operationdb.VWREFTH_ProductionData orderby crp.REFTH_PPId descending select crp;
            operationdb.Configuration.ProxyCreationEnabled = false;
            operationdb.Configuration.LazyLoadingEnabled = false;
            return Json(query_crop, JsonRequestBehavior.AllowGet);
        }

        public JsonResult load_data_prod_act_bydate(DateTime date_val, string monthyear, int block_val)
        {
            var query_crop = from crp in operationdb.VWREFTH_ProductionData
                             where crp.REFTH_ProductionStartDate.Year == date_val.Year &&
                                 crp.REFTH_ProductionStartDate.Month == date_val.Month && crp.REFTH_ProductionStartDate.Day == date_val.Day
                                 && crp.MonthYear == monthyear && crp.REFTH_BlockId == block_val
                             orderby crp.REFTH_PPId descending
                             select crp;
            operationdb.Configuration.ProxyCreationEnabled = false;
            operationdb.Configuration.LazyLoadingEnabled = false;
            return Json(query_crop, JsonRequestBehavior.AllowGet);
        }

        public JsonResult load_data_prod_act_byblock(int block_val, string monthyear)
        {
            var query_crop = from crp in operationdb.VWREFTH_ProductionData
                             where crp.REFTH_BlockId == block_val && crp.MonthYear == monthyear
                             orderby crp.REFTH_PPId descending
                             select crp;
            operationdb.Configuration.ProxyCreationEnabled = false;
            operationdb.Configuration.LazyLoadingEnabled = false;
            return Json(query_crop, JsonRequestBehavior.AllowGet);
        }

        public JsonResult load_data_prod_act_bymonthyear(string monthyear)
        {
            var query_crop = from crp in operationdb.VWREFTH_ProductionData
                             where crp.MonthYear == monthyear
                             orderby crp.REFTH_PPId descending
                             select crp;
            operationdb.Configuration.ProxyCreationEnabled = false;
            operationdb.Configuration.LazyLoadingEnabled = false;
            return Json(query_crop, JsonRequestBehavior.AllowGet);
        }


        //plan data 
        public JsonResult get_productionplan_graphdata(DateTime select_date)
        {
            var qry = from gp in operationdb.VWREFTH_ProductionData
                      where
                          gp.REFTH_ProductionStartDate.Year == select_date.Year && gp.REFTH_ProductionStartDate.Month == select_date.Month
                          && gp.REFTH_ProductionStartDate.Day == select_date.Day
                      select gp;

            return Json(qry, JsonRequestBehavior.AllowGet);
        }

        //plan data
        public JsonResult get_productionplan_graphdatablock(DateTime select_date, int thisblock)
        {
            var qry = from gp in operationdb.VWREFTH_ProductionData
                      where
                          gp.REFTH_ProductionStartDate.Year == select_date.Year && gp.REFTH_ProductionStartDate.Month == select_date.Month &&
                          gp.REFTH_ProductionStartDate.Day == select_date.Day && gp.REFTH_BlockId == thisblock
                      select gp;

            return Json(qry, JsonRequestBehavior.AllowGet);
        }

        //Actual Data
        public JsonResult get_productionplan_graphdatablock_Actual(DateTime select_date, int thisblock)
        {
            var qry = from gp in operationdb.VWREFTH_Production_Actual_Data
                      where
                          gp.REFTH_ProductionStartDate.Year == select_date.Year && gp.REFTH_ProductionStartDate.Month == select_date.Month &&
                          gp.REFTH_ProductionStartDate.Day == select_date.Day && gp.REFTH_BlockId == thisblock
                      select gp;

            return Json(qry, JsonRequestBehavior.AllowGet);
        }

        //ORIGINAL public JsonResult get_productionplan_dataweek(string thisdate)
        //{
        //    var qry = from gp in operationdb.VWREFTH_ProductionData where gp.MonthYear == thisdate select gp;

        //    return Json(qry, JsonRequestBehavior.AllowGet);
        //}

        public JsonResult get_productionplan_dataweek(int iMonth, int iYear)
        {
            //return Json(operationdb.REFTH_OfflineTime().Where(a => a.StartDate.Value.Month == iMonth && a.StartDate.Value.Year == iYear), JsonRequestBehavior.AllowGet);

            return Json(operationdb.REFTH_OfflineTime().Where(a => a.StartDate.Value.Month == iMonth && a.StartDate.Value.Year == iYear).Join(operationdb.REFTH_BlockPairs,
               b => b.BlockPairId, ab => ab.REFTH_BlockPairId,
               (b, ab) => new
               {
                   REFTH_BlockPairId = b.BlockPairId,
                   REFTH_BlockPairs = ab.REFTH_BlockPair,
                   StartDate = b.StartDate,
                   EndDate = b.EndDate
               }), JsonRequestBehavior.AllowGet);
        }

        public JsonResult get_productionplanperblock_dataweek(int iMonth, int iYear, int thisblk)
        {
            return Json(operationdb.REFTH_OfflineTime().Where(a => a.StartDate.Value.Month == iMonth && a.StartDate.Value.Year == iYear && a.BlockPairId == thisblk).Join(operationdb.REFTH_BlockPairs,
               b => b.BlockPairId, ab => ab.REFTH_BlockPairId,
               (b, ab) => new
               {
                   REFTH_BlockPairId = b.BlockPairId,
                   REFTH_BlockPairs = ab.REFTH_BlockPair,
                   StartDate = b.StartDate,
                   EndDate = b.EndDate
               }), JsonRequestBehavior.AllowGet);
        }

        public JsonResult load_data_prod_plan_monthdata(string monthyear)
        {
            var query_crop = from crp in operationdb.VWREFTH_ProdPlanMonthData where crp.MonthYear == monthyear select crp;
            operationdb.Configuration.ProxyCreationEnabled = false;
            operationdb.Configuration.LazyLoadingEnabled = false;
            return Json(query_crop, JsonRequestBehavior.AllowGet);
        }

        public JsonResult load_rppd_datetime_block(int blockid, DateTime rpp_daily_date, int production_type, int streamid)
        {
            var lastactperstage = (from act in operationdb.REFTH_PERBLOCK_DATERANGE(blockid, rpp_daily_date, production_type, streamid) select act).First();

            operationdb.Configuration.ProxyCreationEnabled = false;
            operationdb.Configuration.LazyLoadingEnabled = false;

            return Json(lastactperstage, JsonRequestBehavior.AllowGet);
        }

        public JsonResult load_rppd_datetime_block_plan(int blockid, DateTime rpp_daily_date)
        {
            var lastactperstage = (from act in operationdb.REFTH_PERBLOCK_DATERANGE_PLAN(blockid, rpp_daily_date) select act).First();

            operationdb.Configuration.ProxyCreationEnabled = false;
            operationdb.Configuration.LazyLoadingEnabled = false;

            return Json(lastactperstage, JsonRequestBehavior.AllowGet);
        }

        public JsonResult REFTH_PRODACTIVITY_LOADDATA(DateTime select_date)
        {
            var Activity = (from rpp in operationdb.REFTH_PPDaily_Temp_Table where rpp.REFTH_Proddate == select_date select rpp);
            return Json(Activity, JsonRequestBehavior.AllowGet);
        }

        public JsonResult REFTH_PRODACTIVITY_LOADDATA_PLAN(DateTime select_date)
        {
            var Activity = (from rpp in operationdb.REFTH_PPDaily_Temp_Table_plan where rpp.REFTH_Proddate == select_date select rpp);
            return Json(Activity, JsonRequestBehavior.AllowGet);
        }

        public JsonResult REFTH_PRODACTIVITY_LOAD_PERBLOCK(int thisblock, DateTime select_date)
        {
            //storedproc load data in graph     
            //var Activity = (from cfact in operationdb.REFTH_PRODACTIVITY_LOAD_PERBLOCK(thisblock, select_date, streamid, production_type) select cfact); 
            var Activity = (from ac in operationdb.REFTH_PPDaily_Temp_Table_block where ac.REFTH_BlockId == thisblock && ac.REFTH_Proddate == select_date select ac);
            return Json(Activity, JsonRequestBehavior.AllowGet);
        }

        public JsonResult REFTH_PRODACTIVITY_LOAD_PERSTREAM(DateTime select_date, int thisblock, int streamid)
        {
            //storedproc load data in graph     
            //var Activity = (from cfact in operationdb.REFTH_PRODACTIVITY_LOAD_PERBLOCK(thisblock, select_date, streamid, production_type) select cfact); 
            var Activity = (from ac in operationdb.REFTH_PPDaily_Temp_Table_stream where ac.REFTH_BlockId == thisblock && ac.REFTH_Proddate == select_date && ac.REFTH_PPstreamId == streamid select ac);
            return Json(Activity, JsonRequestBehavior.AllowGet);
        }

        public JsonResult REFTH_PRODACTIVITY_LOAD_PERBLOCK_PLAN(int thisblock, DateTime select_date)
        {
            //storedproc load data in graph         
            var Activity = (from cfact in operationdb.REFTH_PRODACTIVITY_LOAD_PERBLOCK_PLAN(thisblock, select_date) select cfact);
            return Json(Activity, JsonRequestBehavior.AllowGet);
        }

        public JsonResult REFTH_ProdPlan_GetPrevMonth_SP_load(string monthyear)
        {
            //storedproc load data  
            return Json(operationdb.REFTH_ProdPlan_GetPrevMonth_SP(monthyear), JsonRequestBehavior.AllowGet);
        }

        public JsonResult load_rpp_refine_tablemonthtime(int iMonth, int iYear)
        {
            var query_crop = from crp in operationdb.REFTH_Param_DTime_Val
                             where crp.REFTH_ProductionDate.Month == iMonth && crp.REFTH_ProductionDate.Year == iYear
                             select new
                             {
                                 REFTH_ParamId = crp.REFTH_ParamId,
                                 REFTH_ProductionDate = crp.REFTH_ProductionDate,
                                 REFTH_DateTimeVal = crp.REFTH_DateTimeVal == null ? default(DateTime) : crp.REFTH_DateTimeVal
                             };
            operationdb.Configuration.ProxyCreationEnabled = false;
            operationdb.Configuration.LazyLoadingEnabled = false;
            return Json(query_crop, JsonRequestBehavior.AllowGet);
        }

        public JsonResult load_rpp_refine_tablemonthinput(int iMonth, int iYear)
        {
            var query_crop = from crp in operationdb.REFTH_Param_Num_Val
                             where crp.REFTH_ProductionDate.Month == iMonth && crp.REFTH_ProductionDate.Year == iYear
                             select crp;

            operationdb.Configuration.ProxyCreationEnabled = false;
            operationdb.Configuration.LazyLoadingEnabled = false;
            return Json(query_crop, JsonRequestBehavior.AllowGet);
        }

        public JsonResult drawChart_MachineDowntime(DateTime select_date)
        {
            var Activity = (from rpp in operationdb.VWREFTH_MachineDowntime where rpp.REFTH_MDStartTime.Year == select_date.Year && rpp.REFTH_MDStartTime.Month == select_date.Month && rpp.REFTH_MDStartTime.Day == select_date.Day select rpp);
            return Json(Activity, JsonRequestBehavior.AllowGet);
        }

        public JsonResult load_rpp_act_stream(int streamid)
        {
            var query_stream = from crp in operationdb.REFTH_PP_Actcode
                             where crp.REFTH_PPstreamId == streamid                           
                             select crp;
            operationdb.Configuration.ProxyCreationEnabled = false;
            operationdb.Configuration.LazyLoadingEnabled = false;
            return Json(query_stream, JsonRequestBehavior.AllowGet);
        }

        //------------------------data manipulation events(save,update,delete)------------------------------//

        public class manpower_ref
        {

            public DateTime proddate { get; set; }
            public int shiftId { get; set; }
            public int roletypeId { get; set; }
            public int empId { get; set; }
            public int roleGroupId { get; set; }
            public int crew_default { get; set; }

        }

        public void save_ref_manpower(List<manpower_ref> items)
        {
            var i = items;
            DateTime proddate;
            int shiftId;
            int roletypeId;
            int empId;
            int roleGroupId;
            int crew_default;

            for (int x = 0; x < i.Count; x++)
            {
                proddate = i[x].proddate;
                shiftId = i[x].shiftId;
                roletypeId = i[x].roletypeId;
                empId = i[x].empId;
                roleGroupId = i[x].roleGroupId;
                crew_default = i[x].crew_default;

                operationdb.REFTH_MANPOWER_SP(proddate, shiftId, roletypeId, empId, roleGroupId, crew_default);
                operationdb.SaveChanges();
            }
        }

        public class default_manpower_ref
        {
            public int cd_roleGroupId { get; set; }
            public int cd_roletypeId { get; set; }
            public int cd_default_crew { get; set; }
            public int cd_empId { get; set; }
        }

        public void save_ref_default_manpower(List<default_manpower_ref> items)
        {
            var i = items;
            int cd_roleGroupId;
            int cd_roletypeId;
            int cd_default_crew;
            int cd_empId;

            for (int x = 0; x < i.Count; x++)
            {
                cd_roleGroupId = i[x].cd_roleGroupId;
                cd_roletypeId = i[x].cd_roletypeId;
                cd_default_crew = i[x].cd_default_crew;
                cd_empId = i[x].cd_empId;

                operationdb.REFTH_CREWDEFAULT_SP(cd_default_crew, cd_roletypeId, cd_empId, cd_roleGroupId);
                operationdb.SaveChanges();
            }
        }


        public class ref_shorts_var
        {
            public DateTime prodate { get; set; }
            public int shiftno { get; set; }
            public int passno { get; set; }
            public int blockId { get; set; }
            public int row_emp { get; set; }
            public int cellno { get; set; }
            public Nullable<int> short_count { get; set; }

        }

        [OutputCache(NoStore = true, Duration = 0, VaryByParam = "*")]
        public void save_ref_shorts(List<ref_shorts_var> items)
        {
            var sh = items;
            DateTime prodate;
            int shiftno;
            int passno;
            int blockId;
            int row_emp;
            int cellno;
            Nullable<int> short_count;

            for (int s = 0; s < sh.Count; s++)
            {
                prodate = sh[s].prodate;
                shiftno = sh[s].shiftno;
                passno = sh[s].passno;
                blockId = sh[s].blockId;
                row_emp = sh[s].row_emp;
                cellno = sh[s].cellno;
                short_count = sh[s].short_count;

                //save shorts
                operationdb.REFTH_SHORTS_SP(prodate, shiftno, passno, blockId, row_emp, cellno, short_count);
                //operationdb.SaveChanges();

                //save shortscrops
                //operationdb.REFTH_SHORTSCROP_SP(prodate, shiftno, blockId, row_emp, short_count);
                //operationdb.SaveChanges();

                if (short_count == null)
                {
                    //Delete
                    var shorts_del = operationdb.REFTH_Shorts.Where(a => a.REFTH_ProductionDate == prodate && a.REFTH_ShiftId == shiftno && a.REFTH_PassNo == passno
                        && a.REFTH_BlockId == blockId && a.REFTH_RowNo == row_emp && a.REFTH_CellNo == cellno).First();

                    operationdb.REFTH_Shorts.Remove(shorts_del);
                    //operationdb.SaveChanges();
                }
            }

            operationdb.Configuration.ProxyCreationEnabled = false;
            operationdb.Configuration.LazyLoadingEnabled = false;
            operationdb.SaveChanges();
        }

        public class ref_shorts_crop_var
        {
            public DateTime pdate { get; set; }
            public int shiftn { get; set; }
            public int blockno { get; set; }
            public int row_id { get; set; }
            public Nullable<int> short_crop { get; set; }
        }

        public void save_ref_shortsCrop(List<ref_shorts_crop_var> items)
        {

            var sc = items;
            DateTime pdate;
            int shiftn;
            int blockno;
            int row_id;
            Nullable<int> short_crop;

            for (int t = 0; t < sc.Count; t++)
            {
                pdate = sc[t].pdate;
                shiftn = sc[t].shiftn;
                blockno = sc[t].blockno;
                row_id = sc[t].row_id;
                short_crop = sc[t].short_crop;

                operationdb.REFTH_SHORTSCROP_SP(pdate, shiftn, blockno, row_id, short_crop);
                operationdb.SaveChanges();

                if (short_crop == null)
                {
                    //Delete
                    var shorts_del = operationdb.REFTH_Shorts_Crop.Where(a => a.REFTH_ProductionDate == pdate && a.REFTH_ShiftId == shiftn
                        && a.REFTH_BlockId == blockno && a.REFTH_RowNo == row_id).First();

                    operationdb.REFTH_Shorts_Crop.Remove(shorts_del);
                    operationdb.SaveChanges();

                }

            }

        }

        public void add_ref_crop(int blockid, int cropid, DateTime start_date, Nullable<DateTime> end_date, Nullable<decimal> elapsedKAH_crop, Nullable<int> crop)
        {
            operationdb.REFTH_CROPS_SP(blockid, cropid, start_date, end_date, elapsedKAH_crop, crop);
            operationdb.SaveChanges();

        }
        public void edit_ref_crop(int blockid, int cropid, DateTime start_date, Nullable<DateTime> end_date, Nullable<decimal> elapsedKAH_crop, int crop)
        {
            operationdb.REFTH_CROPS_SP(blockid, cropid, start_date, end_date, elapsedKAH_crop, crop);
            operationdb.SaveChanges();
        }

        public void delete_cropshorts_data(int actid)
        {
            //Delete
            var crop_del = operationdb.REFTH_Crops.Where(a => a.REFTH_CropId == actid).First();
            operationdb.REFTH_Crops.Remove(crop_del);
            operationdb.SaveChanges();
        }

        //add no restriction saved
        public void add_ref_prodact_restrict(Nullable<int> ref_id, int blockid, int REFTH_PP_Actcode_Id, DateTime start_date, DateTime end_date, float rppd_totalduration, DateTime rppd_proddate, string ref_prodact_note, int REFTH_PPstreamId, int REFTH_Flag)
        {
            operationdb.REFTH_PROD_DAILY_SP(ref_id, blockid, REFTH_PP_Actcode_Id, start_date, end_date, rppd_totalduration, rppd_proddate, ref_prodact_note, REFTH_PPstreamId, REFTH_Flag);
            operationdb.SaveChanges();
        }

        //delete no restriction saved
        public void delete_prodact_restrict(int actid)
        {
            //Delete
            var prodact_del = operationdb.REFTH_PP_Daily.Where(a => a.REFTH_PPId == actid).First();
            operationdb.REFTH_PP_Daily.Remove(prodact_del);
            operationdb.SaveChanges();
        }

        //edit no restriction saved
        public void edit_ref_prodact_restrict(Nullable<int> ref_id, int blockid, int REFTH_PP_Actcode_Id, DateTime start_date, DateTime end_date, string ref_prodact_note)
        {
            var edit_act = operationdb.REFTH_PP_Daily.Where(a => a.REFTH_PPId == ref_id).First();
            edit_act.REFTH_BlockId = blockid;
            edit_act.REFTH_PPcodeId = REFTH_PP_Actcode_Id;
            edit_act.REFTH_ProductionStartDate = start_date;
            edit_act.REFTH_ProductionEndDate = end_date;
            edit_act.REFTH_Remarks = ref_prodact_note;

            operationdb.SaveChanges();
        }

        public void edit_ref_prodact(Nullable<int> ref_id, int blockid, int REFTH_PP_Actcode_Id, int REFTH_ActDuration, string ref_prodact_note)
        {
            var edit_act = operationdb.REFTH_PP_Daily_Duration.Where(a => a.REFTH_PPId == ref_id).First();
            edit_act.REFTH_BlockId = blockid;
            edit_act.REFTH_PPcodeId = REFTH_PP_Actcode_Id;
            edit_act.REFTH_ActDuration = REFTH_ActDuration;
            edit_act.REFTH_Remarks = ref_prodact_note;

            operationdb.SaveChanges();
        }

        public void edit_ref_prodact_plan(Nullable<int> ref_id, int blockid, int REFTH_PP_Actcode_Id, int REFTH_ActDuration, string ref_prodact_note)
        {
            var edit_act = operationdb.REFTH_PP_Daily_Duration_plan.Where(a => a.REFTH_PPId == ref_id).First();
            edit_act.REFTH_BlockId = blockid;
            edit_act.REFTH_PPcodeId = REFTH_PP_Actcode_Id;
            edit_act.REFTH_ActDuration = REFTH_ActDuration;
            edit_act.REFTH_Remarks = ref_prodact_note;

            operationdb.SaveChanges();
        }

        public class save_ref_rpp_monthlydata_var
        {
            public DateTime REFTH_ExchangeDate { get; set; }
            public int REFTH_CropNo { get; set; }
            public int blkcnt { get; set; }
            public string REFTH_NetKAH { get; set; }
            public string REFTH_AnodeCharged_MT { get; set; }
            public string REFTH_AnodeWtPc { get; set; }
            public string REFTH_ElapsedKAH { get; set; }
            public string REFTH_CurrentEff { get; set; }
            public string REFTH_RequiredKAH { get; set; }
            public DateTime REFTH_KAHDate { get; set; }
            public string REFTH_ScrapRatio { get; set; }

        }

        public void save_ref_rpp_monthlydata(List<save_ref_rpp_monthlydata_var> items)
        {

            var sc = items;
            DateTime REFTH_ExchangeDate;
            int REFTH_CropNo;
            int blkcnt;
            string REFTH_NetKAH;
            string REFTH_AnodeCharged_MT;
            string REFTH_AnodeWtPc;
            string REFTH_ElapsedKAH;
            string REFTH_CurrentEff;
            string REFTH_RequiredKAH;
            DateTime REFTH_KAHDate;
            string REFTH_ScrapRatio;

            for (int t = 0; t < sc.Count; t++)
            {
                REFTH_ExchangeDate = sc[t].REFTH_ExchangeDate;
                blkcnt = sc[t].blkcnt;
                REFTH_CropNo = sc[t].REFTH_CropNo;
                REFTH_NetKAH = sc[t].REFTH_NetKAH;
                REFTH_AnodeCharged_MT = sc[t].REFTH_AnodeCharged_MT;
                REFTH_AnodeWtPc = sc[t].REFTH_AnodeWtPc;
                REFTH_ElapsedKAH = sc[t].REFTH_ElapsedKAH;
                REFTH_CurrentEff = sc[t].REFTH_CurrentEff;
                REFTH_RequiredKAH = sc[t].REFTH_RequiredKAH;
                REFTH_KAHDate = sc[t].REFTH_KAHDate;
                REFTH_ScrapRatio = sc[t].REFTH_ScrapRatio;

                //Convert float to -> string because float adds unknown decimal points when saved in database
                //Convert float to -> string to save the specific decimal point inputted by user and convert string to -> Parse Double to save in database with same decimal points 
                operationdb.REFTH_PPMONTHSAVE_SP(REFTH_ExchangeDate, blkcnt, REFTH_CropNo, NullableDouble.TryParse(REFTH_NetKAH), NullableDouble.TryParse(REFTH_AnodeCharged_MT), NullableDouble.TryParse(REFTH_AnodeWtPc), NullableDouble.TryParse(REFTH_ElapsedKAH), NullableDouble.TryParse(REFTH_CurrentEff), NullableDouble.TryParse(REFTH_RequiredKAH), REFTH_KAHDate, NullableDouble.TryParse(REFTH_ScrapRatio));


                //if (short_crop == null)
                //{
                //    //Delete
                //    var shorts_del = operationdb.REFTH_Shorts_Crop.Where(a => a.REFTH_ProductionDate == pdate && a.REFTH_ShiftId == shiftn
                //        && a.REFTH_BlockId == blockno && a.REFTH_RowNo == row_id).First();

                //    operationdb.REFTH_Shorts_Crop.Remove(shorts_del);
                //    operationdb.SaveChanges();

                //}
            }
            operationdb.SaveChanges();

        }

        //Convert to Double to save if value is null
        public static class NullableDouble
        {
            public static double? TryParse(string input)
            {
                double result;
                var success = double.TryParse(input, out result);
                return success ? result as double? : null;
            }
        }

        public string save_rppmonthKAHDate(int rppmonthkey_id, int rppmonthcropId, DateTime rppmonthexcdate, DateTime start_date)
        {
            var edit_act = operationdb.REFTH_ProdPlanMonth.Where(a => a.REFTH_BlockId == rppmonthkey_id && a.REFTH_CropNo == rppmonthcropId && a.REFTH_ExchangeDate == rppmonthexcdate).First();
            edit_act.REFTH_KAHDate = start_date;
            operationdb.SaveChanges();

            string ds = edit_act.REFTH_KAHDate.Value.ToString("MM/dd/yyyy HH:mm");
            return ds;
        }

        public void add_ref_prodact_by_duration(Nullable<int> ref_id, int blockid, int REFTH_PP_Actcode_Id, float rppd_totalduration, DateTime rppd_proddate, string ref_prodact_note, Nullable<int> REFTH_PPstreamId, int REFTH_Flag)
        {
            operationdb.REFTH_PROD_DAILY_SP_DURATION(ref_id, blockid, REFTH_PP_Actcode_Id, rppd_totalduration, rppd_proddate, ref_prodact_note, REFTH_PPstreamId, REFTH_Flag);
            operationdb.SaveChanges();

        }

        public void insert_ref_prodact_by_duration(Nullable<int> ref_id, int blockid, int REFTH_PP_Actcode_Id, float rppd_totalduration, DateTime rppd_proddate, string ref_prodact_note, Nullable<int> REFTH_PPstreamId, int REFTH_Flag)
        {
            operationdb.REFTH_PROD_DAILY_INSERT_MIDDLE_DURATION(ref_id, blockid, REFTH_PP_Actcode_Id, rppd_totalduration, rppd_proddate, ref_prodact_note, REFTH_PPstreamId, REFTH_Flag);
            operationdb.SaveChanges();

        }

        public void insert_ref_prodact_by_duration_plan(Nullable<int> ref_id, int blockid, int REFTH_PP_Actcode_Id, float rppd_totalduration, DateTime rppd_proddate, string ref_prodact_note)
        {
            operationdb.REFTH_PROD_DAILY_INSERT_MIDDLE_DURATION_PLAN(ref_id, blockid, REFTH_PP_Actcode_Id, rppd_totalduration, rppd_proddate, ref_prodact_note);
            operationdb.SaveChanges();

        }

        public void delete_prodact_data_duration(int key_id, DateTime sdate, Nullable<int> thisblock, Nullable<int> streamid)
        {
            //if user selected to view per block get the row
            if (thisblock > 0)
            {
                int i = 0;
                foreach (var item in operationdb.REFTH_PPDaily_Temp_Table_block.Where(a => a.REFTH_Proddate == sdate))
                {
                    if (i == key_id)
                    {
                        var myid = item.REFTH_PPId;
                        var delete_act = operationdb.REFTH_PP_Daily_Duration.Where(a => a.REFTH_PPId == myid).First();
                        operationdb.REFTH_PP_Daily_Duration.Remove(delete_act);
                    }
                    i++;
                }
                operationdb.SaveChanges();
            }
            //if user selected to view per strean and block get the row
            else if (streamid > 0)
            {
                int i = 0;
                foreach (var item in operationdb.REFTH_PPDaily_Temp_Table_stream.Where(a => a.REFTH_Proddate == sdate))
                {
                    if (i == key_id)
                    {
                        var myid = item.REFTH_PPId;
                        var delete_act = operationdb.REFTH_PP_Daily_Duration.Where(a => a.REFTH_PPId == myid).First();
                        operationdb.REFTH_PP_Daily_Duration.Remove(delete_act);

                    }
                    i++;
                }
                operationdb.SaveChanges();
            }
            else
            {
                int i = 0;
                foreach (var item in operationdb.REFTH_PPDaily_Temp_Table.Where(a => a.REFTH_Proddate == sdate))
                {
                    if (i == key_id)
                    {
                        var myid = item.REFTH_PPId;
                        var delete_act = operationdb.REFTH_PP_Daily_Duration.Where(a => a.REFTH_PPId == myid).First();
                        operationdb.REFTH_PP_Daily_Duration.Remove(delete_act);

                    }
                    i++;
                }
                operationdb.SaveChanges();
            }
        }

        public void delete_prodact_data_duration_plan(int key_id, DateTime sdate, Nullable<int> thisblock)
        {
            //if user selected to view per block get the row
            if (thisblock > 0)
            {
                int i = 0;
                foreach (var item in operationdb.REFTH_PRODACTIVITY_LOAD_PERBLOCK_PLAN(thisblock, sdate))
                {
                    if (i == key_id)
                    {
                        var myid = item.REFTH_PPId;
                        var delete_act = operationdb.REFTH_PP_Daily_Duration_plan.Where(a => a.REFTH_PPId == myid).First();
                        operationdb.REFTH_PP_Daily_Duration_plan.Remove(delete_act);
                    }
                    i++;
                }
                operationdb.SaveChanges();
            }
            else
            {
                int i = 0;
                foreach (var item in operationdb.REFTH_PPDaily_Temp_Table_plan.Where(a => a.REFTH_Proddate == sdate))
                {
                    if (i == key_id)
                    {
                        var myid = item.REFTH_PPId;
                        var delete_act = operationdb.REFTH_PP_Daily_Duration_plan.Where(a => a.REFTH_PPId == myid).First();
                        operationdb.REFTH_PP_Daily_Duration_plan.Remove(delete_act);

                    }
                    i++;
                }
                operationdb.SaveChanges();
            }
        }

        public class save_ref_rpp_monthlydata_headertime_var
        {
            public DateTime REFTHProdDate { get; set; }
            public int REFTHparamid { get; set; }
            public Nullable<DateTime> REFTHdatetime { get; set; }
        }

        public void save_ref_rpp_monthlydata_headertime(List<save_ref_rpp_monthlydata_headertime_var> items)
        {

            var sc = items;
            DateTime REFTHProdDate;
            int REFTHparamid;
            Nullable<DateTime> REFTHdatetime;

            for (int t = 0; t < sc.Count; t++)
            {
                REFTHProdDate = sc[t].REFTHProdDate;
                REFTHparamid = sc[t].REFTHparamid;
                REFTHdatetime = sc[t].REFTHdatetime;

                operationdb.REFTH_PARAM_DTIME_SP(REFTHProdDate, REFTHparamid, REFTHdatetime);
            }
            operationdb.SaveChanges();
        }

        public class save_ref_rpp_monthlydataheader_input_var
        {
            public DateTime REFTHProdDate { get; set; }
            public int REFTHparamid { get; set; }
            public Nullable<Decimal> val_ { get; set; }

        }
        public void save_ref_rpp_monthlydataheader_input(List<save_ref_rpp_monthlydataheader_input_var> items)
        {

            var sc = items;
            DateTime REFTHProdDate;
            int REFTHparamid;
            Nullable<Decimal> val_;

            for (int t = 0; t < sc.Count; t++)
            {
                REFTHProdDate = sc[t].REFTHProdDate;
                REFTHparamid = sc[t].REFTHparamid;
                val_ = sc[t].val_;

                operationdb.REFTH_PARAM_NUMERIC_SP(REFTHProdDate, REFTHparamid, val_);
            }
            operationdb.SaveChanges();
        }

        //SAVE loaded data to temp table plan
        public void REFTH_PRODACTIVITY_LOADSAVEDATA(DateTime select_date)
        {
            //truncate table first;
            operationdb.Database.ExecuteSqlCommand("truncate table REFTH_PPDaily_Temp_Table");
            //storedproc load data in graph            
            var slb = (from sdf in operationdb.REFTH_Blocks select sdf);
            var strm = from asd in operationdb.REFTH_PP_Streams select asd;
            foreach (var item in slb)
            {
                //var cntr = 0; //operationdb.REFTH_PRODACTIVITY_LOAD_PERBLOCK(item.REFTH_BlockId, select_date).Count();
                // if (cntr > 0)
                //{
                foreach (var strms in strm)
                {
                    for (var flg = 0; flg < strm.Count(); flg++)
                    {
                        foreach (var xz in operationdb.REFTH_PRODACTIVITY_LOAD_PERBLOCK(item.REFTH_BlockId, select_date, strms.REFTH_PPstreamId, flg)) //(blockid,date,streamid,flag)
                        {
                            var REFTH_PPId = xz.REFTH_PPId;
                            var REFTH_BlockId = xz.REFTH_BlockId;
                            var REFTH_PPcodeId = xz.REFTH_PPcodeId;
                            var REFTH_ActCode = xz.REFTH_ActCode;
                            var REFTH_ActCodeDesc = xz.REFTH_ActCodeDesc;
                            var REFTH_Style_Color = xz.REFTH_Style_Color;
                            var REFTH_ActDuration = xz.REFTH_ActDuration;
                            var REFTH_ActSequence = xz.REFTH_ActSequence;
                            var REFTH_Proddate = xz.REFTH_Proddate;
                            var REFTH_Remarks = xz.REFTH_Remarks;
                            var StartTime = xz.StartTime;
                            var EndTime = xz.EndTime;
                            var REFTH_PPstreamId = xz.REFTH_PPstreamId;
                            var REFTH_Flag = xz.REFTH_Flag;
                            var REFTH_Streamname = xz.REFTH_Streamname;

                            operationdb.REFTH_PPDaily_Temp_Table_SP(REFTH_PPId, REFTH_BlockId, REFTH_PPcodeId, REFTH_ActCode, REFTH_ActCodeDesc, REFTH_Style_Color, REFTH_ActDuration, REFTH_ActSequence, REFTH_Proddate, REFTH_Remarks, StartTime, EndTime, REFTH_PPstreamId, REFTH_Streamname, REFTH_Flag);
                        }
                    }
                }
            }
            //}
            operationdb.SaveChanges();
        }
        public void REFTH_PRODACTIVITY_LOADSAVEDATA_BLOCK(DateTime select_date, int thisblock)
        {
            //truncate table first;
            operationdb.Database.ExecuteSqlCommand("truncate table REFTH_PPDaily_Temp_Table_block");

            //storedproc load data in graph            
            var slb = (from sdf in operationdb.REFTH_Blocks select sdf);
            var strm = from asd in operationdb.REFTH_PP_Streams select asd;
            //foreach (var item in slb)
            //{
            //var cntr = 0; //operationdb.REFTH_PRODACTIVITY_LOAD_PERBLOCK(item.REFTH_BlockId, select_date).Count();

            // if (cntr > 0)
            //{
            foreach (var strms in strm)
            {
                for (var flg = 0; flg < strm.Count(); flg++)
                {
                    foreach (var xz in operationdb.REFTH_PRODACTIVITY_LOAD_PERBLOCK(thisblock, select_date, strms.REFTH_PPstreamId, flg)) //(blockid,date,streamid,flag)
                    {
                        var REFTH_PPId = xz.REFTH_PPId;
                        var REFTH_BlockId = xz.REFTH_BlockId;
                        var REFTH_PPcodeId = xz.REFTH_PPcodeId;
                        var REFTH_ActCode = xz.REFTH_ActCode;
                        var REFTH_ActCodeDesc = xz.REFTH_ActCodeDesc;
                        var REFTH_Style_Color = xz.REFTH_Style_Color;
                        var REFTH_ActDuration = xz.REFTH_ActDuration;
                        var REFTH_ActSequence = xz.REFTH_ActSequence;
                        var REFTH_Proddate = xz.REFTH_Proddate;
                        var REFTH_Remarks = xz.REFTH_Remarks;
                        var StartTime = xz.StartTime;
                        var EndTime = xz.EndTime;
                        var REFTH_PPstreamId = xz.REFTH_PPstreamId;
                        var REFTH_Flag = xz.REFTH_Flag;
                        var REFTH_Streamname = xz.REFTH_Streamname;

                        operationdb.REFTH_PPDaily_Temp_Table_SP_block(REFTH_PPId, REFTH_BlockId, REFTH_PPcodeId, REFTH_ActCode, REFTH_ActCodeDesc, REFTH_Style_Color, REFTH_ActDuration, REFTH_ActSequence, REFTH_Proddate, REFTH_Remarks, StartTime, EndTime, REFTH_PPstreamId, REFTH_Streamname, REFTH_Flag);
                    }
                }
            }
            //}
            //}
            operationdb.SaveChanges();
        }
        public void REFTH_PRODACTIVITY_LOADSAVEDATA_STREAM(DateTime select_date, int thisblock, int streamid)
        {
            //truncate table first;
            operationdb.Database.ExecuteSqlCommand("truncate table REFTH_PPDaily_Temp_Table_stream");

            //storedproc load data in graph            
            var slb = (from sdf in operationdb.REFTH_Blocks select sdf);
            var strm = from asd in operationdb.REFTH_PP_Streams select asd;
            //foreach (var item in slb)
            //{
            //var cntr = 0; //operationdb.REFTH_PRODACTIVITY_LOAD_PERBLOCK(item.REFTH_BlockId, select_date).Count();

            // if (cntr > 0)
            //{
            //foreach (var strms in strm)
            //{
            for (var flg = 0; flg < strm.Count(); flg++)
            {
                foreach (var xz in operationdb.REFTH_PRODACTIVITY_LOAD_PERBLOCK(thisblock, select_date, streamid, flg)) //(blockid,date,streamid,flag)
                {
                    var REFTH_PPId = xz.REFTH_PPId;
                    var REFTH_BlockId = xz.REFTH_BlockId;
                    var REFTH_PPcodeId = xz.REFTH_PPcodeId;
                    var REFTH_ActCode = xz.REFTH_ActCode;
                    var REFTH_ActCodeDesc = xz.REFTH_ActCodeDesc;
                    var REFTH_Style_Color = xz.REFTH_Style_Color;
                    var REFTH_ActDuration = xz.REFTH_ActDuration;
                    var REFTH_ActSequence = xz.REFTH_ActSequence;
                    var REFTH_Proddate = xz.REFTH_Proddate;
                    var REFTH_Remarks = xz.REFTH_Remarks;
                    var StartTime = xz.StartTime;
                    var EndTime = xz.EndTime;
                    var REFTH_PPstreamId = xz.REFTH_PPstreamId;
                    var REFTH_Flag = xz.REFTH_Flag;
                    var REFTH_Streamname = xz.REFTH_Streamname;

                    operationdb.REFTH_PPDaily_Temp_Table_SP_stream(REFTH_PPId, REFTH_BlockId, REFTH_PPcodeId, REFTH_ActCode, REFTH_ActCodeDesc, REFTH_Style_Color, REFTH_ActDuration, REFTH_ActSequence, REFTH_Proddate, REFTH_Remarks, StartTime, EndTime, REFTH_PPstreamId, REFTH_Streamname, REFTH_Flag);
                }
            }
            //}
            //}
            //}
            operationdb.SaveChanges();
        }

        //SAVE loaded data to temp table actual ---Actual changed to PLAN data
        public void get_productionplan_graphdata_Actual(DateTime select_date)
        {
            //truncate table first;
            operationdb.Database.ExecuteSqlCommand("truncate table REFTH_PPDaily_Temp_Table_plan");

            //storedproc load data in graph            
            var slb = (from sdf in operationdb.REFTH_Blocks select sdf);
            foreach (var item in slb)
            {
                var cntr = operationdb.REFTH_PRODACTIVITY_LOAD_PERBLOCK_PLAN(item.REFTH_BlockId, select_date).Count();
                if (cntr > 0)
                {
                    foreach (var xz in operationdb.REFTH_PRODACTIVITY_LOAD_PERBLOCK_PLAN(item.REFTH_BlockId, select_date))
                    {
                        var REFTH_PPId = xz.REFTH_PPId;
                        var REFTH_BlockId = xz.REFTH_BlockId;
                        var REFTH_PPcodeId = xz.REFTH_PPcodeId;
                        var REFTH_ActCode = xz.REFTH_ActCode;
                        var REFTH_ActCodeDesc = xz.REFTH_ActCodeDesc;
                        var REFTH_Style_Color = xz.REFTH_Style_Color;
                        var REFTH_ActDuration = xz.REFTH_ActDuration;
                        var REFTH_ActSequence = xz.REFTH_ActSequence;
                        var REFTH_Proddate = xz.REFTH_Proddate;
                        var REFTH_Remarks = xz.REFTH_Remarks;
                        var StartTime = xz.StartTime;
                        var EndTime = xz.EndTime;

                        operationdb.REFTH_PPDaily_Temp_Table_SP_plan(REFTH_PPId, REFTH_BlockId, REFTH_PPcodeId, REFTH_ActCode, REFTH_ActCodeDesc, REFTH_Style_Color, REFTH_ActDuration, REFTH_ActSequence, REFTH_Proddate, REFTH_Remarks, StartTime, EndTime);
                    }
                }
            }
            operationdb.SaveChanges();
        }

        public void add_ref_prodact_by_duration_plan(Nullable<int> ref_id, int blockid, int REFTH_PP_Actcode_Id, float rppd_totalduration, DateTime rppd_proddate, string ref_prodact_note)
        {
            operationdb.REFTH_PROD_DAILY_SP_DURATION_PLAN(ref_id, blockid, REFTH_PP_Actcode_Id, rppd_totalduration, rppd_proddate, ref_prodact_note);
            operationdb.SaveChanges();

        }

    }
}
