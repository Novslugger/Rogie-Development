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
    
    public partial class RT_FeedRate_FTP_Result
    {
        public string tag { get; set; }
        public System.DateTime time { get; set; }
        public string value { get; set; }
        public int status { get; set; }
        public Nullable<System.TimeSpan> timestep { get; set; }
        public string TimeOnly { get; set; }
        public Nullable<System.DateTime> StartDate { get; set; }
        public Nullable<double> TargetVal { get; set; }
    }
}