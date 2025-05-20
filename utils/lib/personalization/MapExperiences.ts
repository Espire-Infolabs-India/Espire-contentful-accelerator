import {
  BaselineWithExperiencesEntry,
  Entry,
  ExperienceMapper,
} from "@ninetailed/experience.js-utils-contentful";

export type singularBlock = Entry | BaselineWithExperiencesEntry | undefined;
export type singularOrArrayBlock = singularBlock | singularBlock[];

export const hasExperiences = (
  entry: unknown
): entry is BaselineWithExperiencesEntry => {
  const hasNtExperiences =
    (entry as BaselineWithExperiencesEntry).fields.nt_experiences !== undefined;
  return hasNtExperiences;
};

export const parseExperiences = (entry: unknown) => {
  const experiences = hasExperiences(entry)
    ? entry.fields.nt_experiences
        .filter((experience) => ExperienceMapper.isExperienceEntry(experience))
        .map((experience) => ExperienceMapper.mapExperience(experience))
    : [];
  return experiences;
};

export const hoistId = (entry: singularBlock) => {
  if (entry) {
    return {
      ...entry,
      id: entry.sys.id,
    };
  }
  return {
    id: "",
  };
};
