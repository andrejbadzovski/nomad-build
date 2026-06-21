import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'project',
  title: 'Projects',
  type: 'document',
  fields: [
    defineField({ name: 'name', title: 'Project Name', type: 'string', validation: (r) => r.required() }),
    defineField({ name: 'location', title: 'Location (e.g. Mosman, Sydney)', type: 'string' }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          { title: 'New Build', value: 'New Build' },
          { title: 'Full Renovation', value: 'Full Renovation' },
          { title: 'Extension', value: 'Extension' },
          { title: 'Fit-Out', value: 'Fit-Out' },
          { title: 'Kitchen & Bath', value: 'Kitchen & Bath' },
          { title: 'Design & Build', value: 'Design & Build' },
        ],
      },
    }),
    defineField({ name: 'year', title: 'Year Completed', type: 'number' }),
    defineField({ name: 'image', title: 'Cover Image', type: 'image', options: { hotspot: true }, validation: (r) => r.required() }),
    defineField({ name: 'gallery', title: 'Gallery Images', type: 'array', of: [{ type: 'image', options: { hotspot: true } }] }),
    defineField({ name: 'featured', title: 'Show on Homepage', type: 'boolean', initialValue: true }),
    defineField({ name: 'order', title: 'Display Order (1 = first)', type: 'number' }),
  ],
  orderings: [{ title: 'Display Order', name: 'orderAsc', by: [{ field: 'order', direction: 'asc' }] }],
  preview: {
    select: { title: 'name', subtitle: 'location', media: 'image' },
  },
})
