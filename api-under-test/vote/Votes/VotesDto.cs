using System.Text.Json.Serialization;

namespace vote.Votes
{
    public record VotesDto
    {
        public string? vote1 { get; set; }
        public string? vote2 { get; set; }
        public string? vote3 { get; set; }
    }
    
    [JsonSerializable(typeof(VotesDto))]
    [JsonSourceGenerationOptions(GenerationMode = JsonSourceGenerationMode.Default)]
    internal partial class VotesDtoContext : JsonSerializerContext
    {
        
    }

}