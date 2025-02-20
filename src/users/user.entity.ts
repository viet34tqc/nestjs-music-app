import { ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import { PlaylistEntity } from 'src/playlists/playlist.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity('users')
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  // This @ApiProperty is optional because we have already declared swagger plugin in the main.ts file
  @ApiProperty({
    example: 'Jane',
    description: 'Provide the first name of the user',
  })
  @Column()
  firstName: string;

  @ApiProperty({
    example: 'Doe',
    description: 'provide the lastName of the user',
  })
  @Column()
  lastName: string;

  @ApiProperty({
    example: 'jane_doe@gmail.com',
    description: 'Provide the email of the user',
  })
  @Column({ unique: true })
  email: string;

  @ApiProperty({
    example: 'test123#@',
    description: 'Provide the password of the user',
  })
  // Exclude password from the response
  // Need @UseInterceptors(ClassSerializerInterceptor) in the controller
  @Column()
  @Exclude()
  password: string;

  @Column({ nullable: true })
  apiKey: string;

  @Column({ nullable: true })
  phone: string;

  // (playlist) => playlist.user is inverse side
  // This is crucial for TypeORM to understand how the two entities relate to each other
  // Here, it indicates that each playlist instance has a property called user
  @OneToMany(() => PlaylistEntity, (playlist) => playlist.user)
  playlists: PlaylistEntity[];
}
