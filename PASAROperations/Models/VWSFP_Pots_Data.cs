//------------------------------------------------------------------------------
// <auto-generated>
//    This code was generated from a template.
//
//    Manual changes to this file may cause unexpected behavior in your application.
//    Manual changes to this file will be overwritten if the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

namespace PASAROperations.Models
{
    using System;
    using System.Collections.Generic;
    
    public partial class VWSFP_Pots_Data
    {
        public int SFP_DataId { get; set; }
        public int SFP_LocationId { get; set; }
        public string SFP_LocationName { get; set; }
        public Nullable<int> SFP_PrevLocationId { get; set; }
        public string SFP_PrevLocationName { get; set; }
        public System.DateTime SFP_DTime { get; set; }
        public int SFP_PotId { get; set; }
        public int SFP_CoolTime { get; set; }
        public System.DateTime SFP_ExpectedDTime { get; set; }
        public Nullable<System.DateTime> SFP_ActualDTime { get; set; }
        public string SFP_DumpTemp { get; set; }
        public string SFP_Remark { get; set; }
        public Nullable<int> SFP_Val_GroupId { get; set; }
        public Nullable<int> Location_Status { get; set; }
        public Nullable<int> Pot_Name { get; set; }
        public Nullable<int> Pot_Status { get; set; }
        public Nullable<System.DateTime> SFP_ForBreakingDTime { get; set; }
    }
}
