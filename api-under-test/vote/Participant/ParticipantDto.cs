using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace vote.Participant
{
    public record ParticipantDto
    {
        public string Name { get; }
        
        public ParticipantDto(string name )
        {
            Name = name;
        }
    }
    
    [JsonSerializable(typeof(IList<ParticipantDto>))]
    [JsonSourceGenerationOptions(GenerationMode = JsonSourceGenerationMode.Default)]
    internal partial class ParticipantDtoContext : JsonSerializerContext
    {
        
    }
}